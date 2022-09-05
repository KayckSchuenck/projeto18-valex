import dayjs from 'dayjs';
import bcrypt from 'bcrypt'
import Cryptr from 'cryptr'
import {CardUpdateData,findById as findCardById,findByCardDetails } from '../repositories/cardRepository.js';
import { insert as insertRecharge} from '../repositories/rechargeRepository.js';
import { findByApiKey } from '../repositories/companyRepository.js';
import { findById as findByBusinessId } from '../repositories/businessRepository.js';
import {totalBalance} from '../services/cardService.js'
import {insert as insertPayment} from '../repositories/paymentRepository.js';
import notFoundError from '../middlewares/notFoundError.js'
const cryptr=new Cryptr(process.env.KEY)

async function checkCardValidity(id:number){
    const cardData:CardUpdateData=await findCardById(id)
    if(!cardData) notFoundError("Cartão")

    if(dayjs(cardData.expirationDate).isBefore(dayjs().format("MM/YY"))) throw {type:"Unauthorized",message:"Cartão já expirado"}

    if(cardData.isBlocked) throw {type:"Conflict",message:"Cartão bloqueado"}
    return cardData
}

async function checkValidityBeforePayment(amount:number,businessId:number,id:number,type:string){

    const businessData=await findByBusinessId(businessId)
    if(!businessData) notFoundError("Estabelecimento")
    if(businessData.type!==type) throw {type:"Unauthorized",message:"Tipo de cartão inválido"}

    const {balance}=await totalBalance(id)
    if(balance<amount) throw {type:"Unauthorized",message:"Saldo insuficiente"}

    await insertPayment({ cardId:id, businessId:businessData.id, amount })
}


export async function rechargeService (id:number,amount:number,APIKey:string){
    const companyKeyExists=await findByApiKey(APIKey)
    if(!companyKeyExists) notFoundError("Chave da empresa")

    await checkCardValidity(id)

    await insertRecharge({cardId:id,amount})
}

export async function paymentService (id:number,amount:number,password:string,businessId:number){
    
    const cardData=await checkCardValidity(id)

    if(!bcrypt.compareSync(password, cardData.password)) throw {type:"Unauthorized",message:"Senha incorreta"}

    await checkValidityBeforePayment(amount,businessId,id,cardData.type)
}

export async function onlinePaymentService(number:string,cardholderName:string,expirationDate:string,cvv:string,amount:number,businessId:number){
    
    const cardData=await findByCardDetails(number,cardholderName,expirationDate)
    if(!cardData) notFoundError("Cartão")
    await checkCardValidity(cardData.id)

    const cardCvv=cryptr.decrypt(cardData.securityCode)
    if(cardCvv!==cvv) throw {type:"Unauthorized",message:"Código de segurança incorreto"}

    await checkValidityBeforePayment(amount,businessId,cardData.id,cardData.type)
}

