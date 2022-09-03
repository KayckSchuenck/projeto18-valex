import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import cryptr from 'cryptr'
import bcrypt from 'bcrypt'
import { findByApiKey } from '../repositories/companyRepository.js';
import { findById } from '../repositories/employeeRepository.js';
import { findByTypeAndEmployeeId,TransactionTypes,insert, update, findByCardDetails,CardUpdateData,findById as findCardById } from '../repositories/cardRepository.js';
import {findByCardId as findRechargesByCardId} from '../repositories/rechargeRepository.js'
import {findByCardId as findPaymentsByCardId} from '../repositories/paymentRepository.js'

function notFoundError(entity:string) {
	return {
		type: "NotFound",
		message: `${entity} não encontrado(a)!`
	};
}

async function getCardId(id:number){
    const cardData:CardUpdateData=await findCardById(id)

    if(!cardData) throw notFoundError("Cartão")

    return cardData
}

async function checkPasswordAndDate(password:string,hashPassword:string,expirationDate:string) {
    if(!bcrypt.compareSync(password, hashPassword)) throw {type:"Unauthorized",message:"Senha incorreta"}

    if(dayjs(expirationDate).isBefore(dayjs(), 'month')) throw {type:"Unauthorized",message:"Cartão já expirado"}
}

export async function insertCard(employeeId:number,APIKey:string,name:string,isVirtual:boolean,type:TransactionTypes){

    const cardExists=await findByApiKey(APIKey)
    if(!cardExists) throw notFoundError("Chave da empresa")

    const employeeExists=await findById(employeeId)
    if(!employeeExists) throw notFoundError("Funcionário")

    const employeeCardTypeExists=await findByTypeAndEmployeeId(type,employeeId)
    if(!employeeCardTypeExists) throw {type:"Conflict",message:"Funcionário já possui cartão desse tipo"}


    function setCardName(name:string){
        const allNames=name.split(" ")
        const firstName=allNames.splice(0,1);
        const lastName = allNames.pop();
        const middleNames = allNames.filter(middlename => middlename.length >= 3);
        const middleInitials = middleNames.map(middlename => middlename[0])
        const cardName=[...firstName,...middleInitials,...lastName].join(" ").toUpperCase()
        return cardName
    }

    const cvv:string=faker.finance.creditCardCVV()

    const data={
        cardholderName:setCardName(name),
        securityCode:cryptr.encrypt(cvv),
        number:faker.finance.creditCardNumber(),
        expirationDate:dayjs().add(5, 'y').format("MM/YY"),
        password:null,
        isVirtual,
        isBlocked:true,
        type,
        originalCardId:null,
        employeeId
    }

    await insert(data)
}

export async function activateCard(number:string,cardholderName:string,expirationDate:string,password:string,cvv:string){

    const cardData=await findByCardDetails(number,cardholderName,expirationDate)

    if(dayjs(expirationDate).isBefore(dayjs(), 'month')) throw {type:"Unauthorized",message:"Cartão já expirado"}

    const cardCvv=cryptr.decrypt(cardData.securityCode)
    if(cardCvv!==cvv) throw {type:"Unauthorized",message:"Código de segurança incorreto"}

    const hashPassword=bcrypt.hashSync(password,10)

    await update(cardData.id,{isBlocked:false,password:hashPassword})
}

export async function totalBalance(id:number){
    const recharges=await findRechargesByCardId(id)
    const payments=await findPaymentsByCardId(id)

    const balance:number=recharges.reduce((acc:number,{amount})=>acc+amount,0)-payments.reduce((acc:number,{amount})=>acc+amount,0)
    
    const response={
        balance,
        transactions:payments,
        recharges
    }
    return response
}

export async function blockCardService(id:number,password:string){
    const {password:hashPassword,expirationDate,isBlocked}=await getCardId(id)

    checkPasswordAndDate(password,hashPassword,expirationDate)

    if(isBlocked) throw {type:"Conflict",message:"Cartão já bloqueado"}
    
    await update(id,{isBlocked:true})
}

export async function unblockCardService(id:number,password:string){
    const {password:hashPassword,expirationDate,isBlocked}=await getCardId(id)

    checkPasswordAndDate(password,hashPassword,expirationDate)

    if(!isBlocked) throw {type:"Conflict",message:"Cartão já desbloqueado"}

    await update(id,{isBlocked:false})
}