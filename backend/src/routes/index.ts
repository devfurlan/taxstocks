import { Router } from 'express';

import customersRouter from './customers.routes';
import sessionsRouter from './sessions.routes';
import tradingNotesRouter from './tradingNotes.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/trading-notes', tradingNotesRouter);

export default routes;
