import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { schemaCreateCard,schemaActivateCard,schemaGetBalance,schemaBlockUnblock } from '../schemas/schemas.js';
import { createCard,updateCard,getBalance, blockCard, unblockCard } from "../controllers/cardController.js";

const cardRouter=Router();

cardRouter.post('/createCard',schemaValidateMiddleware(schemaCreateCard),createCard)
cardRouter.put('/activateCard',schemaValidateMiddleware(schemaActivateCard),updateCard)
cardRouter.post('/getBalance',schemaValidateMiddleware(schemaGetBalance),getBalance)
cardRouter.post('/blockCard',schemaValidateMiddleware(schemaBlockUnblock),blockCard)
cardRouter.post('/unblockCard',schemaValidateMiddleware(schemaBlockUnblock),unblockCard)


export default cardRouter