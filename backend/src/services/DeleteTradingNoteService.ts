import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TradingNote from '../models/TradingNote';

class DeleteTradingNoteService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getRepository(TradingNote);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction does not exist.');
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTradingNoteService;
