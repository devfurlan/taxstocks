import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TaxCalculationRepository from '../repositories/TaxCalculationRepository';
// import DeleteTradingNoteService from '../services/DeleteTradingNoteService';

export default class TaxCalculationController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { year } = request.params;

    const taxCalculationRepository = getCustomRepository(TaxCalculationRepository);
    const tradingNote = await taxCalculationRepository.getTaxes(Number(year));

    return response.json(tradingNote);
  }
}
