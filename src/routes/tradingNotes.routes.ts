import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import TradingNotesController from '../controllers/TradingNotesController';
import ImportTradingNoteController from '../controllers/ImportTradingNoteController';

const upload = multer(uploadConfig);

const tradingNotesRouter = Router();
const tradingNotesController = new TradingNotesController();
const importTradingNotesController = new ImportTradingNoteController();

tradingNotesRouter.use(ensureAuthenticated);

tradingNotesRouter.get('/', tradingNotesController.index);

tradingNotesRouter.get('/:id', tradingNotesController.show);

tradingNotesRouter.delete('/:id', tradingNotesController.destroy);

tradingNotesRouter.post(
  '/import',
  upload.single('file'),
  importTradingNotesController.create
);

export default tradingNotesRouter;
