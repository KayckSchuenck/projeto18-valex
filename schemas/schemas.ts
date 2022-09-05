import {number,string,object,boolean} from 'joi'

export const schemaCreateCard=object({
    type:string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
    name:string().required(),
    isVirtual:boolean().required(),
    employeeId:number().required()
})

export const schemaActivateCard=object({
    password:string().length(4).required(),
    cvv:string().required(),
    number:string().required(),
    cardholderName:string().required(),
    expirationDate:string().length(5).required()
})

export const schemaBlockUnblock=object({
    id:number().required(),
    password:string().required()
})

export const schemaRecharge=object({
    id:number().required(),
    amount:number().min(0.01).required()
})

export const schemaPayment=object({
    id:number().required(),
    amount:number().min(0.01).required(),
    password:string().required()
})

export const schemaOnlinePayment=object({
    amount:number().min(0.01).required(),
    cvv:string().required(),
    number:string().required(),
    cardholderName:string().required(),
    expirationDate:string().length(5).required()
})