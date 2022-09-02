import { Request,Response,NextFunction } from "express";

export default function errorHandlingMiddleware(error, req:Request, res:Response, next:NextFunction) {
	if (error.type === "IncorrectData") return res.status(422).send(error.message)

	return res.sendStatus(500);
}