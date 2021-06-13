import { Router } from 'express';

import customersRouter from './customers.routes';
import sessionsRouter from './sessions.routes';
import tradingNotesRouter from './tradingNotes.routes';
import taxCalculationRouter from "./taxCalculation.routes";

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/trading-notes', tradingNotesRouter);
routes.use('/tax-calculation', taxCalculationRouter);

export default routes;
