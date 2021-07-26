import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import TaxCalculationController from '../controllers/TaxCalculationController';

const taxCalculationRouter = Router();
const taxCalculationController = new TaxCalculationController();

taxCalculationRouter.use(ensureAuthenticated);

taxCalculationRouter.get('/years', taxCalculationController.index);

taxCalculationRouter.get('/:year', taxCalculationController.show);

export default taxCalculationRouter;
