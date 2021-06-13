import fs from 'fs';
import csvParse from 'csv-parse';
import { getCustomRepository, getRepository, In } from 'typeorm';
import convertDateBRtoISO from '../Utils/convertDateBRtoISO';
import TradingNote from '../models/TradingNote';
import Broker from '../models/Broker';
import TradingNotesRepository from '../repositories/TradingNotesRepository';

interface CSVTransaction {
  code: string;
  ticker: string;
  quantity: number;
  type: 'buy' | 'sale';
  trade: 'D' | 'S';
  price: number;
  date: Date;
  broker_name: string;
  broker_cnpj: string;
}

class ImportTradingNotesService {
  async execute(filePath: string, user_id: string): Promise<TradingNote[]> {
    const tradingNoteRepository = getCustomRepository(TradingNotesRepository);
    const brokersRepository = getRepository(Broker);

    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const tradingNotes: CSVTransaction[] = [];
    const brokers: string[] = [];

    parseCSV.on('data', async line => {
      const [code, ticker, quantity, type, price, trade, date, broker_name, broker_cnpj] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!code || !ticker || !quantity || !type || !trade || !broker_cnpj) return;

      const dateConverted = convertDateBRtoISO(date);

      brokers.push(broker_cnpj);
      tradingNotes.push({ code, ticker, quantity, type, price, trade, date: dateConverted, broker_name, broker_cnpj });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentBrokers = await brokersRepository.find({
      where: {
        cnpj: In(brokers),
      },
    });

    const existentBrokersCNPJs = existentBrokers.map(
      (broker: Broker) => broker.cnpj,
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
        type: tradingNote.type,
        price: tradingNote.price,
        trade: tradingNote.trade,
        date: tradingNote.date,
        customer_id: user_id,
        broker_cnpj: finalBrokers.find(
          broker => broker.cnpj === tradingNote.broker_cnpj,
        ),
      })),
    );

    await tradingNoteRepository.save(createdTradingNotes);

    await fs.promises.unlink(filePath);

    return createdTradingNotes;
  }
}

export default ImportTradingNotesService;
