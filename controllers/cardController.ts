import {insertCard,activateCard, totalBalance,blockCardService} from "../services/cardService";
import { Request,Response } from "express";

export async function createCard(req:Request,res:Response){
    const APIKey: string = req.headers["x-api-key"].toString()
    const {name,type,isVirtual,employeeId}=req.body

    await insertCard(employeeId,APIKey,name,isVirtual,type)

    res.status(201).send("Cartão criado com sucesso")
}

export async function updateCard(req:Request,res:Response) {
    const {cvv,password,number,expirationDate,cardholderName}=req.body

    await activateCard(number,cardholderName,expirationDate,password,cvv)

    res.status(200).send("Cartão ativado com sucesso")
}

export async function getBalance(req:Request,res:Response) {
    const {cardId}=req.params

    const result=await totalBalance(Number(cardId))

    res.status(200).send(result)
}

export async function blockCard(req:Request,res:Response) {
    const {password,id}=req.body

    await blockCardService(id,password)

    res.status(200).send("Cartão bloqueado com sucesso")
}

export async function unblockCard(req:Request,res:Response) {
    const {password,id}=req.body

    await blockCardService(id,password)

    res.status(200).send("Cartão desbloqueado com sucesso")
}