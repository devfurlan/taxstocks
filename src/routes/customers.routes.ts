import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CustomersController from '../controllers/CustomersController';

const usersRouter = Router();
const customersController = new CustomersController();

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    birth: Joi.date().required(),
    gender: Joi.any().valid('M', 'F'),
    cpf: Joi.string().length(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), customersController.create);

export default usersRouter;
