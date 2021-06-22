import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import DeleteTradingNoteService from '../services/DeleteTradingNoteService';
import TradingNote from '../models/TradingNote';

export default class TradingNotesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const tradingNotesRepository = getRepository(TradingNote);

    const tradingNote = await tradingNotesRepository.find();

    return response.json(tradingNote);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const tradingNotesRepository = getRepository(TradingNote);
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
