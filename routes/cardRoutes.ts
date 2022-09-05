import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { schemaCreateCard,schemaActivateCard,schemaBlockUnblock } from '../schemas/schemas.js';
import { createCard,updateCard,getBalance, blockUnblockCard } from "../controllers/cardController.js";

const cardRouter=Router();

cardRouter.post('/createcard',schemaValidateMiddleware(schemaCreateCard),createCard)
cardRouter.put('/activatecard',schemaValidateMiddleware(schemaActivateCard),updateCard)
cardRouter.get('/balance/:cardId',getBalance)
cardRouter.put('/altercard/:type',schemaValidateMiddleware(schemaBlockUnblock),blockUnblockCard)


export default cardRouter