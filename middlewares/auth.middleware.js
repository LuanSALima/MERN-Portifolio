const jwt = require("jsonwebtoken"); /*Método para geração do token de autenticação*/

module.exports = (request, response, next) => {
  try {
    //Primeiro fazer pequenas verificações com if porque elas consomem menos recurso do servidor e a função verify() pode acabar consumindo muito do servidor se for usadas muitas vezes

    //Busca o token nos headers da requisição
    const authHeader = request.headers.authorization;

    //Se não possuir o token no header
    if (!authHeader) {
      throw new Error("No token provided");
    }

    //Caso todas as verificações acima estiverem corretas, executa a função do jsonwebtoken
    jwt.verify(authHeader, process.env.JWT_HASH, (err, decoded) => {
      if (err) throw new Error("Token invalid");

      //Adicionando o userId na requisição
      request.userId = decoded.id;

      //Indica que é possível avançar na requisição, ou seja, este middleware permite que a requisição acesse o controller
      return next();
    });
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: error.message
    });
  }
};
