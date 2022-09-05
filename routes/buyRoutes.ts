import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { schemaPayment, schemaRecharge,schemaOnlinePayment } from '../schemas/schemas.js';
import { localPayment, rechargeCard,onlinePayment } from '../controllers/buyControllers.js';

const buyRouter=Router();

buyRouter.post('/recharge',schemaValidateMiddleware(schemaRecharge),rechargeCard)
buyRouter.post('/localPayments/:businessId',schemaValidateMiddleware(schemaPayment),localPayment)
buyRouter.post('/onlinePayments/:businessId',schemaValidateMiddleware(schemaOnlinePayment),onlinePayment)

export default buyRouter