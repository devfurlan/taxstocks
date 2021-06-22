import { getRepository } from 'typeorm';
import uniqTickersByType from '../Utils/uniqTickersByType';
import Done from '../models/Done';
import Portfolio from '../models/Portfolio';
import TradingNote from '../models/TradingNote';
import AddTradingDoneService from './AddTradingDoneService';

class SaleTickerService {
  async execute(tradingNotes: TradingNote[], user_id: string): Promise<void> {
    const portfolioRepository = getRepository(Portfolio);
    const doneRepository = getRepository(Done);
    const addTradingDoneService = new AddTradingDoneService();

    const saleNotes = tradingNotes.filter(note => note.type === 'sale');

    if (saleNotes.length) {
      const saleTickers = uniqTickersByType(saleNotes);

      await Promise.all(saleTickers.map(async (note, index) => {
        const portfolio = await portfolioRepository.findOne({ where: { ticker: note.ticker } });

        if (!portfolio) {
          console.log(`Ticker doesn't exist`);
          return;
        } else {
          if ((Number(portfolio.quantity) - Number(note.quantity)) < 1) {
            await portfolioRepository.remove(portfolio);

            await addTradingDoneService.execute(doneRepository, note, portfolio, user_id);
          } else {
            const updatedQuantityPortfolio = Number(portfolio.quantity) - Number(note.quantity);
            portfolio.quantity = updatedQuantityPortfolio;

            const updatedTotalPortfolio = Number(portfolio.average_price) * updatedQuantityPortfolio;
            portfolio.total = Number(updatedTotalPortfolio.toFixed(2));

            await portfolioRepository.save(portfolio);

            await addTradingDoneService.execute(doneRepository, note, portfolio, user_id);
          }
        }
      }));
    }
  }
}

export default SaleTickerService;
