import { EntityRepository, Repository } from 'typeorm';

import TradingNote from '../models/TradingNote';

interface IBalance {
  buy: number;
  sale: number;
  total: number;
}

@EntityRepository(TradingNote)
class TradingNotesRepository extends Repository<TradingNote> {
  public async getBalance(): Promise<IBalance> {
    const transactions = await this.find();

    const { buy, sale } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'buy':
            accumulator.buy += Number(transaction.price);
            break;

          case 'sale':
            accumulator.sale += Number(transaction.price);
            break;

          default:
            break;
        }

        return accumulator;
      },
      {
        buy: 0,
        sale: 0,
        total: 0,
      },
    );

    const total = buy - sale;

    return { buy, sale, total };
  }
}

export default TradingNotesRepository;
