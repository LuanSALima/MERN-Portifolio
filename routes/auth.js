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

    const user = await User.findOne({ email }).select({
      _id: 1,
      username: 1,
      email: 1,
      role: 1,
      password: 1,
      emailIsConfirmed: 1
    });

    if (!user) {
      throw new Error(request.t('user_notfound'));
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error(request.t('user_passincorrect'));
    }

    user.password = undefined;

    let token = await jwtHelper.generateToken(user._id, user.role);

    user._id = undefined;

    response
      .status(200)
      .json({
        success: true,
        user,
        token
      });
  } catch (error) {
    response
      .status(200)
      .json(handleError(error, request));
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

      return response.status(200).json({
        success: true,
        message: request.t('user_created')
      });
    } catch (error) {
      return response.status(200).json(handleError(error, request));
    }
});

router.route('/send-email-token').get(authorized(), async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.user.id, { emailConfirmToken: await generateEmailToken() }, {
          new: true,
          runValidators: true
      }).select('+emailConfirmToken');

    if(!user) {
      throw new Error(request.t('user_notfound'));
    }

    //Enviando e-mail com o token de confirmação de email
    await mailer.sendMail({
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: request.t('email_confirmsubject'),
      template: 'confirm_email',
      context: {
        userName: user.username,
        emailToken: user.emailConfirmToken,
        link: process.env.CLIENT_URL
      }
    });
    
    return response.json({
      'success': true,
      'message': request.t('user_emailsent')
    });
  } catch (error) {
    return response.status(400).json(handleError(error, request));
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
      throw new Error(request.t('user_invalidtoken'));
    }

    let token = undefined;
    if(jwtHelper.checkToken(request)) {
      token = await jwtHelper.generateToken(request.user.id, Role.User);
    }
      
    return response.json({
      'success': true,
      'message': request.t('user_emailconfirmed'),
      'token': token
    });

  } catch (error) {
    return response.status(400).json(handleError(error, request));
  }
});

router.route('/testAuthMiddleware')
  .get(
    authorized(), 
    (request, response) => {
      response.status(200).json({
        success: true,
        message: request.t('controller_acessed')
      });
    }
  );

module.exports = router;