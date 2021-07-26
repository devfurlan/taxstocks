import fs from 'fs';
import csvParse from 'csv-parse';
import { getRepository, In } from 'typeorm';
import convertDateBRtoISO from '../Utils/convertDateBRtoISO';
import TradingNote from '../models/TradingNote';
import Broker from '../models/Broker';
import BuyTickerService from './BuyTickerService';
import SaleTickerService from './SaleTickerService';

interface ICSVTransaction {
  code: string;
  ticker: string;
  quantity: number;
  price: number;
  total: number;
  type: 'buy' | 'sale';
  trade: 'D' | 'S';
  date: Date;
  broker_name: string;
  broker_cnpj: string;
}

class ImportTradingNotesService {
  async execute(filePath: string, user_id: string): Promise<TradingNote[]> {
    const tradingNoteRepository = getRepository(TradingNote);
    const brokersRepository = getRepository(Broker);
    const buyTickerService = new BuyTickerService();
    const saleTickerService = new SaleTickerService();

    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const tradingNotes: ICSVTransaction[] = [];
    const brokers: string[] = [];

    parseCSV.on('data', async line => {
      const [code, ticker, quantity, price, total, trade, type, date, broker_name, broker_cnpj] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!code || !ticker || !quantity || !price || !total || !type || !trade || !broker_cnpj) return;

      const dateConverted = convertDateBRtoISO(date);

      brokers.push(broker_cnpj);
      tradingNotes.push({
        code,
        ticker,
        quantity,
        price,
        total,
        trade,
        type,
        date: dateConverted,
        broker_name,
        broker_cnpj,
      });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentBrokers = await brokersRepository.find({
      where: {
        cnpj: In(brokers),
      },
    });

    const existentBrokersCNPJs = existentBrokers.map(
      (broker: Broker) => broker.cnpj.trim(),
    );

    const addBrokerCNPJ = brokers
      .filter(broker => !existentBrokersCNPJs.includes(broker))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newBroker = brokersRepository.create(
      addBrokerCNPJ.map(cnpj => ({
        cnpj,
      })),
    );

    await brokersRepository.save(newBroker);

    const finalBrokers = [...newBroker, ...existentBrokers];

    const createdTradingNotes = tradingNoteRepository.create(
      tradingNotes.map(tradingNote => ({
        code: tradingNote.code,
        ticker: tradingNote.ticker,
        quantity: tradingNote.quantity,
        price: tradingNote.price,
        total: tradingNote.total,
        trade: tradingNote.trade,
        type: tradingNote.type,
        date: tradingNote.date,
        customer_id: user_id,
        broker_cnpj: finalBrokers.find(
          broker => broker.cnpj === tradingNote.broker_cnpj,
        ),
      })),
    );

    await tradingNoteRepository.save(createdTradingNotes);

    await fs.promises.unlink(filePath);

    await buyTickerService.execute(createdTradingNotes, user_id);

    await saleTickerService.execute(createdTradingNotes, user_id);

    return createdTradingNotes;
  }
}

export default ImportTradingNotesService;
