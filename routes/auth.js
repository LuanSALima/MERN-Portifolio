const router = require('express').Router();
let User = require('../schemas/user.schema.js');

const bcrypt = require("bcryptjs"); /*Método de encriptamento da senha*/
const jwtHelper = require("../helpers/jwt"); /*Método para geração do token de autenticação*/

//Middleware criado para verificar se no header da requisição possui o token de autenticação e possui o tipo de usuário permitido
const authorized = require('../middlewares/auth.middleware');

const crypto = require('crypto');

const handleError = require('../helpers/validation');

const Role = require('../helpers/roles');

//Função Async pois é necessário esperar a pesquisa no BCD retornar.
async function generateEmailToken() {

  //Criação de um token de 20 caracteres hexadecimais
  var emailToken = crypto.randomBytes(20).toString('hex');

  //Verifica se este token já foi gerado para algum usuário
  while(await User.exists({ 'emailConfirmToken': emailToken })) {
    emailToken = crypto.randomBytes(20).toString('hex');
  }

  return emailToken;
}

router.route('/authenticate').post( async (request, response) => {

  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Senha incorreta");
    }

    user.password = undefined;

    response
      .status(200)
      .json({
        success: true,
        user,
        token: jwtHelper.generateToken(user._id, user.role)
      });
  } catch (error) {
    response
      .status(200)
      .json(handleError(error));
  }
});

router.route('/signUp').post( async (request, response) => {

  try {
      const { username, email, password } = request.body;

      const user = await User.create({
        username,
        email,
        password,
        role: Role.User
      });

      user.password = undefined;

      return response.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return response.status(200).json(handleError(error));
    }
});

router.route('/testAuthMiddleware')
  .get(
    authorized(), 
    (request, response) => {
      response.status(200).json({
        success: true,
        message: 'Controller acessado!'
      });
    }
  );

module.exports = router;