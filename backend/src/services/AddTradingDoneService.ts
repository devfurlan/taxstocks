import { getRepository, Repository } from 'typeorm';
import Done from '../models/Done';
import Portfolio from '../models/Portfolio';

interface ITicker {
  ticker: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
}

class AddTradingDoneService {
  async execute(data: Repository<Done>, note: ITicker, portfolio: Portfolio, user_id: string): Promise<Done> {
    const doneRepository = getRepository(Done);

    const balance = Number(note.quantity * note.price) - Number(note.quantity * portfolio.average_price);

    const createdDone = await data.create({
      ticker: note.ticker,
      quantity: note.quantity,
      entry_price: portfolio.average_price,
      entry_date: portfolio.entry_date,
      exit_price: note.price,
      exit_date: note.date,
      balance,
      customer_id: user_id,
    });

    await doneRepository.save(createdDone);

    return createdDone;
  }
}

export default AddTradingDoneService;
