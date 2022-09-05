import { Request,Response } from "express";
import {paymentService, rechargeService, onlinePaymentService} from "../services/buyServices.js";

export async function rechargeCard(req:Request,res:Response){
    const APIKey: string = req.headers["x-api-key"].toString()
    const {id,amount}=req.body

    await rechargeService(id,amount,APIKey)
    res.sendStatus(201)
}

export async function localPayment(req:Request,res:Response){
    const {id,amount,password}=req.body
    const {businessId}=req.params
    
    await paymentService(id,amount,password,Number(businessId))
    res.sendStatus(201)
}

export async function onlinePayment(req:Request,res:Response){
    const {cvv,number,expirationDate,cardholderName,amount}=req.body
    const {businessId}=req.params

    await onlinePaymentService(number,cardholderName,expirationDate,cvv,amount,Number(businessId))
    res.sendStatus(201)
}