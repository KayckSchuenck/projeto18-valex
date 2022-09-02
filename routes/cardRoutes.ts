import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { schemaCreateCard,schemaActivateCard } from '../schemas/schemas.js';
import {createCard,updateCard} from "../controllers/cardController.js";

const cardRouter=Router();

cardRouter.post('/createCard',schemaValidateMiddleware(schemaCreateCard),createCard)
cardRouter.put('/activateCard',schemaValidateMiddleware(schemaActivateCard),updateCard)


export default cardRouter