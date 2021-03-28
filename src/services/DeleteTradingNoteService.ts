import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TradingNotesRepository from '../repositories/TradingNotesRepository';

class DeleteTradingNoteService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TradingNotesRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction does not exist.');
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTradingNoteService;
