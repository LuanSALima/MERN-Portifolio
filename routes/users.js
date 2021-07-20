const router = require('express').Router();
let User = require('../schemas/user.schema');

const bcrypt = require("bcryptjs"); /*Método de encriptamento da senha*/

//Middleware criado para verificar se no header da requisição possui o token de autenticação e possui o tipo de usuário permitido
const authorized = require('../middlewares/auth.middleware');

const Role = require('../helpers/roles');

const handleError = require('../helpers/validation');

const crypto = require('crypto');

const mailer = require('../modules/mailer'); /*Modulo criado que possui toda a biblioteca de envio de email configurada*/

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

router.route('/test').get((request, response) => {
	response.json({
		message: "Hello World"
	});
});

router.route('/list').get(authorized(Role.Admin), async (request, response) => {
	try {
      const users = await User.find();
      if (users.length === 0) {
        throw new Error("Não há Usuários Cadastrados no Banco de Dados!");
      }

      return response.status(200).json({
        success: true,
        users
      });
    } catch (error) {
      return response.status(400).json(handleError(error));
    }
});

router.route('/addAdmin').post( async (request, response) => {

  try {
      const { username, email, password } = request.body;

      const user = await User.create({
        username,
        email,
        password,
        role: Role.Admin
      });

      user.password = undefined;
      user.emailConfirmToken = undefined;

      return response.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return response.status(200).json(handleError(error));
    }
});

router.route('/account/update').post(authorized(), async (request, response) => {
	try {
		const { username, email } = request.body;

		const user = await User.findByIdAndUpdate(request.user.id, { username, email }, {
	        new: false,
	        runValidators: true,
	    }); // {new: false} Para retornar a versão antiga do bcd, {runValidators: true} Para validar os campos antes do update

		if (!user) {
			throw new Error("Usuário não encontrado");
		}
			
		return response.json({
			'success': true,
			'message': 'Usuário atualizado!'
		});

	} catch (error) {
		return response.status(400).json(handleError(error));
	}
});

router.route('/password-update').post(authorized(), async (request, response) => {
	try {
		const { actualPassword, newPassword } = request.body;

		const user = await User.findById(request.user.id).select("+password");

		if(!user) {
			throw new Error("Usuário não encontrado!");
		}

		if (!(await bcrypt.compare(actualPassword, user.password))) {
	      throw new Error("Senha atual incorreta!");
	    }

		user.password = newPassword;

		await user.save();

		return response.json({
			'success': true,
			'message': 'Senha alterada com sucesso!'
		});
	} catch (error) {
		return response.status(404).json(handleError(error));
	}
});

router.route('/account').get(authorized(), async (request, response) => {
	try {
		
		const user = await User.findById(request.user.id);

		if(!user) {
			throw new Error("Usuário não encontrado!");
		}

		return response.json({
			'success': true,
			user
		});
	} catch (error) {
		return response.status(404).json(handleError(error));
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
			"emailConfirmToken": null
		}).select('+emailConfirmToken');

		if (!user) {
			throw new Error('Token inválido!');
		}
			
		return response.json({
			'success': true,
			'message': 'Email Confirmado com sucesso!'
		});

	} catch (error) {
		return response.status(400).json(handleError(error));
	}
});

router.route('/:id').delete(authorized(Role.Admin), async (request, response) => {
	try {
		const user = await User.findByIdAndDelete(request.params.id);
		
		if (!user) {
	        throw new Error("Usuário Não Existe!");
	    }

		return response.json({
			'success': true,
			'message': 'Usuário deletado!'
		});

	} catch (error) {
		return response.status(400).json(handleError(error));
	}
});

router.route('/:id').get(authorized(Role.Admin), async (request, response) => {
	try {
		const user = await User.findById(request.params.id);
		
		if (!user) {
	        throw new Error("Usuário Não encontrado!");
	    }

		return response.json({
			'success': true,
			user
		});

	} catch (error) {
		return response.status(400).json(handleError(error));
	}
});

router.route('/update/:id').post(authorized(Role.Admin), async (request, response) => {
	try {
		const { username, email } = request.body;

		const user = await User.findByIdAndUpdate(request.params.id, { username, email }, {
	        new: false,
	        runValidators: true,
	    });

		if (!user) {
			throw new Error("Usuário não encontrado");
		}
			
		return response.json({
			'success': true,
			'message': 'Usuário atualizado!'
		});

	} catch (error) {
		return response.status(400).json(handleError(error));
	}
});

module.exports = router;