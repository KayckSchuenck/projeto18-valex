export default function notFoundError(entity:string) {
	throw {
		type: "NotFound",
		message: `${entity} não encontrado(a)!`
	};
}