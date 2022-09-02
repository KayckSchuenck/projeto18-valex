import {insertCard,activateCard} from "../services/createCardService";

export async function createCard(req,res){
    const APIKey: string = req.headers["x-api-key"];
    const {name,type,isVirtual,employeeId}=req.body

    await insertCard(employeeId,APIKey,name,isVirtual,type)

    res.status(201).send("Cartão criado com sucesso")
}

export async function updateCard(req,res) {
    const {cvv,password,number,expirationDate,cardholderName}=req.body

    await activateCard(number,cardholderName,expirationDate,password,cvv)

    res.status(201).send("Cartão ativado com sucesso")
}