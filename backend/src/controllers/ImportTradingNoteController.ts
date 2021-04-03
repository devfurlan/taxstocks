import { Request, Response } from 'express';
import ImportTradingNoteService from '../services/ImportTradingNoteService';

export default class ImportTradingNoteController {
  public async create(request: Request, response: Response): Promise<Response> {
    const importTradingNotes = new ImportTradingNoteService();

    const tradingNotes = await importTradingNotes.execute(request.file.path, request.user.id);

    return response.json(tradingNotes);
  }
}
