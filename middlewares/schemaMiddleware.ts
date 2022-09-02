export function  schemaValidateMiddleware(schema) {
    return (req, res, next) => { 
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        throw {type:"IncorrectData", message:"Dados inválidos"}
      }
      next();
    }
  }
export default schemaValidateMiddleware;