import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TaxCalculationRepository from '../repositories/TaxCalculationRepository';
import DoneRepository from '../repositories/DoneRepository';

export default class TaxCalculationController {
  public async index(request: Request, response: Response): Promise<Response> {

    const doneRepository = getCustomRepository(DoneRepository);
    const yearsDone = await doneRepository.getYears();

    return response.json(yearsDone);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { year } = request.params;

    const taxCalculationRepository = getCustomRepository(TaxCalculationRepository);
    const tradingNote = await taxCalculationRepository.getTaxes(Number(year));

    return response.json(tradingNote);
  }
}
