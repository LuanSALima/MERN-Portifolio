const router = require('express').Router();
let User = require('../schemas/user.schema.js');

const bcrypt = require("bcryptjs"); /*Método de encriptamento da senha*/
const jwtHelper = require("../helpers/jwt"); /*Método para geração do token de autenticação*/

//Middleware criado para verificar se no header da requisição possui o token de autenticação e possui o tipo de usuário permitido
const authorized = require('../middlewares/auth.middleware');

const crypto = require('crypto');

const mailer = require('../modules/mailer'); /*Modulo criado que possui toda a biblioteca de envio de email configurada*/

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
        role: Role.Guest
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

router.route('/send-email-token').get(authorized(), async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.user.id, { emailConfirmToken: await generateEmailToken() }, {
          new: true,
          runValidators: true
      }).select('+emailConfirmToken');

    if(!user) {
      throw new Error("Usuário não encontrado!");
    }

    //Enviando e-mail com o token de confirmação de email
    await mailer.sendMail({
      to: user.email,
      from: 'nodeportifolio@gmail.com',
      subject: 'Email Confirm',
      template: 'confirm_email',
      context: {
        userName: user.username,
        emailToken: user.emailConfirmToken,
        link: process.env.CLIENT_URL
      }
    });
    
    return response.json({
      'success': true,
      'message': 'E-mail enviado!'
    });
  } catch (error) {
    return response.status(400).json(handleError(error));
  }
});

router.route('/confirm-email').post(async (request, response) => {
  try {
    const { emailConfirmToken } = request.body;

    const user = await User.findOneAndUpdate({emailConfirmToken}, {
      "emailIsConfirmed": "true",
      "emailConfirmToken": null,
      "role": Role.User
    }).select('+emailConfirmToken');

    if (!user) {
      throw new Error('Token inválido!');
    }

    let token = undefined;
    if(jwtHelper.checkToken(request)) {
      token = jwtHelper.generateToken(request.user.id, Role.User);
    }
      
    return response.json({
      'success': true,
      'message': 'Email Confirmado com sucesso!',
      'token': token
    });

  } catch (error) {
    return response.status(400).json(handleError(error));
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