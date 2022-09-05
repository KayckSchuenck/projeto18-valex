import { Request,Response,NextFunction } from "express";

export default function errorHandlingMiddleware(error:any, req:Request, res:Response, next:NextFunction) {
	if (error.type === "IncorrectData") return res.status(422).send(error.message)
	if (error.type === "NotFound") return res.status(404).send(error.message)
	if (error.type === "Conflict") return res.status(409).send(error.message)
	if (error.type === "Unauthorized") return res.status(401).send(error.message)
	console.log(error)
	return res.sendStatus(500);
}