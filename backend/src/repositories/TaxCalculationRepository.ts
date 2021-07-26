import { EntityRepository, Repository } from 'typeorm';
import TradingNote from '../models/TradingNote';

interface ITaxes {
  month: number;
  balance: string;
  swing_balance: string;
  day_balance: string;
  sale: string;
  swing_sale: string;
  day_sale: string;
  tax: string;
  swing_tax: string;
  day_tax: string;
}

@EntityRepository(TradingNote)
class TaxCalculationRepository extends Repository<TradingNote> {
  public async getTaxes(year: Number): Promise<ITaxes> {
    const notesByYear = await this.query(`
      with tax as (
        select
           extract(month from exit_date) as month,
           -- SWING TRADE
           coalesce(sum(balance) filter(where trade = 'S'), 0) as swing_balance,
           (coalesce(sum(quantity) filter(where trade = 'S'), 0) * coalesce(sum(exit_price) filter(where trade = 'S'), 0)) as swing_sale,
           case
               when (coalesce(sum(quantity) filter(where trade = 'S'), 0) * coalesce(sum(exit_price) filter(where trade = 'S'), 0)) > 20000
                   then (coalesce(sum(balance) filter(where trade = 'S'), 0) * 0.15) - (coalesce(sum(balance) filter(where trade = 'S'), 0) * 0.00005)-- Imposto de Renda Retido na Fonte: 0,005%
               else 0
           end as swing_tax,
           case
               when coalesce(sum(balance) filter(where trade = 'S'), 0) < 0
                   then coalesce(sum(balance) filter(where trade = 'S'), 0)
               else 0
           end as swing_prejuizo,
           -- DAY TRADE
           coalesce(sum(balance) filter(where trade = 'D'), 0) as day_balance,
           (coalesce(sum(quantity) filter(where trade = 'D'), 0) * coalesce(sum(exit_price) filter(where trade = 'D'), 0)) as day_sale,
           case
               when coalesce(sum(balance) filter(where trade = 'D'), 0) > 0
                   then (coalesce(sum(balance) filter(where trade = 'D'), 0) * 0.15) - (coalesce(sum(balance) filter(where trade = 'D'), 0) * 0.01)-- Imposto de Renda Retido na Fonte: 1%
               else 0
           end as day_tax,
           case
               when coalesce(sum(balance) filter(where trade = 'D'), 0) < 0
                   then coalesce(sum(balance) filter(where trade = 'D'), 0)
               else 0
           end as day_prejuizo
        from done
        where extract(year from exit_date) = '${year}'
        group by extract(month from exit_date)
      )
      select
          month,
          (swing_balance + day_balance) as balance,
          swing_balance,
          day_balance,
          (swing_sale + day_sale) as sale,
          swing_sale,
          day_sale,
          (swing_tax + day_tax) as tax,
          swing_tax,
          day_tax
      from tax
      order by month
    `);

    return notesByYear;
  }
}

export default TaxCalculationRepository;
