import { getRepository } from 'typeorm';
import uniqTickersByType from '../Utils/uniqTickersByType';
import Portfolio from '../models/Portfolio';
import TradingNote from '../models/TradingNote';

interface IPortfolio {
  ticker: string;
  quantity: number;
  average_price: number;
  entry_date: Date;
  total: number;
  customer_id: string;
}

class BuyTickerService {
  async execute(tradingNotes: TradingNote[], user_id: string): Promise<void> {
    const portfolioRepository = getRepository(Portfolio);

    const buyNotes = tradingNotes.filter(note => note.type === 'buy');

    if (buyNotes.length) {
      const buyTickers = uniqTickersByType(buyNotes);

      await Promise.all(buyTickers.map(async (note, index) => {
        const portfolio = await portfolioRepository.findOne({ where: { ticker: note.ticker } });

        if (!portfolio) {
          const newPortfolio: IPortfolio = {
            ticker: note.ticker,
            quantity: note.quantity,
            average_price: note.price,
            entry_date: note.date,
            total: note.total,
            customer_id: user_id,
          };

          const createdPortfolio = await portfolioRepository.create(newPortfolio);

          await portfolioRepository.save(createdPortfolio);
        } else {
          const updatedQuantityPortfolio = Number(note.quantity) + Number(portfolio.quantity);
          portfolio.quantity = updatedQuantityPortfolio;

          const updatedTotalPortfolio = Number(portfolio.total) + Number(note.total);
          portfolio.total = Number(updatedTotalPortfolio.toFixed(2));

          const averagePricePortfolio = updatedTotalPortfolio / updatedQuantityPortfolio;
          portfolio.average_price = Number(averagePricePortfolio.toFixed(2));

          await portfolioRepository.save(portfolio);
        }
      }));
    }
  }
}

export default BuyTickerService;
