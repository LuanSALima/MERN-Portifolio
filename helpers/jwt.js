const jwt = require("jsonwebtoken"); /*Método para geração do token de autenticação*/

//Método para gerar o token jwt, necessário passar o id
module.exports.generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_HASH, {
    expiresIn: 300, /*(5 minutos)Tempo em segundo para o expiramento do token*/
  });
}

module.exports.checkToken = (request) => {
  try{
    //Busca o token nos headers da requisição
    const token = request.headers.authorization;

    //Se não possuir o token no header
    if (!token) {
      throw new Error("No token provided");
    }

    //Caso todas as verificações acima estiverem corretas, executa a função do jsonwebtoken
    jwt.verify(token, process.env.JWT_HASH, (err, decoded) => {
      if (err) throw new Error("Token invalid");

      if(!decoded.id || !decoded.role) {
        throw new Error("Invalid Token");
      }

      request.user = {
        id: decoded.id,
        role: decoded.role
      };
      
    });

    return true;
  } catch (error) {
    return false;
  }
  
}