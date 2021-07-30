const router = require('express').Router();
let User = require('../schemas/user.schema');

const bcrypt = require("bcryptjs"); /*Método de encriptamento da senha*/

//Middleware criado para verificar se no header da requisição possui o token de autenticação e possui o tipo de usuário permitido
const authorized = require('../middlewares/auth.middleware');

const Role = require('../helpers/roles');

const handleError = require('../helpers/validation');

router.route('/test').get((request, response) => {
	response.json({
		message: "Hello World"
	});
});

router.route('/list').get(authorized([Role.User, Role.Admin]), async (request, response) => {
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

router.route('/addAdmin').post(async (request, response) => {

  try {
      const { username, email, password } = request.body;

      const user = await User.create({
        username,
        email,
        password,
        role: Role.Admin
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

router.route('/:id').delete(authorized([Role.User, Role.Admin]), async (request, response) => {
	try {
		if(request.user.role === Role.Admin) {
			const user = await User.findByIdAndDelete(request.params.id);

			if (!user) {
		        throw new Error("Usuário Não Existe!");
		    }
		} else {
			const user = await User.findById(request.params.id);

			if (!user) {
		        throw new Error("Usuário Não Existe!");
		    }

		    if(user.role === Role.Admin) {
		    	throw new Error("Não é possível excluir um usuário administrador");
		    }

			if(user.role === Role.User) {
				throw new Error("Não é possível excluir um usuário que possui o e-mail confirmado");
			}

			user.remove();
		}

		return response.json({
			'success': true,
			'message': 'Usuário deletado!'
		});

	} catch (error) {
		return response.status(400).json(handleError(error));
	}
});

router.route('/:id').get(authorized([Role.User, Role.Admin]), async (request, response) => {
	try {
		const user = await User.findById(request.params.id);
		
		if (!user) {
	        throw new Error(request.t('user_notfound'));
	    }

		return response.json({
			'success': true,
			user
		});

	} catch (error) {
		return response.status(400).json(handleError(error));
	}
});

router.route('/update/:id').post(authorized([Role.User, Role.Admin]), async (request, response) => {
	try {
		const { username, email } = request.body;

		if(request.user.role === Role.Admin) {
			const user = await User.findByIdAndUpdate(request.params.id, { username, email }, {
		        new: false,
		        runValidators: true,
		    });

			if (!user) {
		        throw new Error("Usuário Não Existe!");
		    }
		} else {
			const user = await User.findById(request.params.id);

			if (!user) {
		        throw new Error("Usuário Não Existe!");
		    }

		    if(user.role === Role.Admin) {
		    	throw new Error("Não é possível editar um usuário administrador");
		    }

			if(user.role === Role.User) {
				throw new Error("Não é possível editar um usuário que possui o e-mail confirmado");
			}

			await User.findByIdAndUpdate(request.params.id, { username, email }, {
		        new: false,
		        runValidators: true,
		    });
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