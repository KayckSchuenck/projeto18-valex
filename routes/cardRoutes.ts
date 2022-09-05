import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { schemaCreateCard,schemaActivateCard,schemaBlockUnblock } from '../schemas/schemas.js';
import { createCard,updateCard,getBalance, blockCard, unblockCard } from "../controllers/cardController.js";

const cardRouter=Router();

cardRouter.post('/createCard',schemaValidateMiddleware(schemaCreateCard),createCard)
cardRouter.put('/activateCard',schemaValidateMiddleware(schemaActivateCard),updateCard)
cardRouter.get('/getBalance:cardId',getBalance)
cardRouter.put('/blockCard',schemaValidateMiddleware(schemaBlockUnblock),blockCard)
cardRouter.put('/unblockCard',schemaValidateMiddleware(schemaBlockUnblock),unblockCard)


export default cardRouter