import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import customersRouter from './customers.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/test', ensureAuthenticated, (request, response) => {
  return response.json({ message: 'Authenticated!' });
});

export default routes;
