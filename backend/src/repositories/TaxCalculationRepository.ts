import {EntityRepository, Raw, Repository} from 'typeorm';

import TradingNote from '../models/TradingNote';

interface ITaxes {
  buy: number;
  sale: number;
  total: number;
}

@EntityRepository(TradingNote)
class TaxCalculationRepository extends Repository<TradingNote> {
  public async getTaxes(year: Number): Promise<ITaxes> {

    const notesByYear = await this.find({
      where: {
        date: Raw(dateFieldName => `extract(year from ${dateFieldName}) = '${year}'`),
      }
    })

    console.log(notesByYear)

    const somaMovimentacaoMensal = '';

    // INICIA LOOPING: DAY E SWING TRADE

        // Verificar se movimentação é maior que 20k

        // SE NÃO
        // return;

        // SE SIM

        // Verificar prejuízo anterior

        // Subtrai prejuízo, se tiver

        // Calcula 15% de imposto

    // FECHA LOOPING





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

export default TaxCalculationRepository;
