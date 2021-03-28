import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TradingNotesRepository from '../repositories/TradingNotesRepository';
import DeleteTradingNoteService from '../services/DeleteTradingNoteService';

export default class TradingNotesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const tradingNotesRepository = getCustomRepository(TradingNotesRepository);

    const tradingNote = await tradingNotesRepository.find();

    return response.json(tradingNote);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const tradingNotesRepository = getCustomRepository(TradingNotesRepository);
    const tradingNote = await tradingNotesRepository.findOne(id);

    return response.json(tradingNote);
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTradingNote = new DeleteTradingNoteService();

    await deleteTradingNote.execute(id);

    return response.status(204).send();
  }
}
