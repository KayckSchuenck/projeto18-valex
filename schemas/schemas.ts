import joi from 'joi'

export const schemaCreateCard=joi.object({
    type:joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
    name:joi.string().required(),
    isVirtual:joi.boolean().required(),
    employeeId:joi.number().required()
})

export const schemaActivateCard=joi.object({
    password:joi.string().length(4).pattern(/^[0-9]+$/).required(),
    cvv:joi.string().required(),
    number:joi.string().required(),
    cardholderName:joi.string().required(),
    expirationDate:joi.string().length(5).required()
})

export const schemaBlockUnblock=joi.object({
    id:joi.number().required(),
    password:joi.string().required()
})

export const schemaRecharge=joi.object({
    id:joi.number().required(),
    amount:joi.number().min(0.01).required()
})

export const schemaPayment=joi.object({
    id:joi.number().required(),
    amount:joi.number().min(0.01).required(),
    password:joi.string().required()
})

export const schemaOnlinePayment=joi.object({
    amount:joi.number().min(0.01).required(),
    cvv:joi.string().required(),
    number:joi.string().required(),
    cardholderName:joi.string().required(),
    expirationDate:joi.string().length(5).required()
})