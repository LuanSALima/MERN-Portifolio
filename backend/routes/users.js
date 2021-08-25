const router = require('express').Router();

let User = require('../schemas/user.schema');
let RefreshToken = require('../schemas/refreshToken.schema.js');

const bcrypt = require("bcryptjs"); /*Método de encriptamento da senha*/

//Middleware criado para verificar se no header da requisição possui o token de autenticação e possui o tipo de usuário permitido
const authorized = require('../middlewares/auth.middleware');

const Role = require('../helpers/roles');

const handleError = require('../helpers/validation');

const i18next = require("i18next");

router.route('/test').get((request, response) => {
	response.json({
		message: request.t('hello_world')
	});
});

router.route('/list').get(authorized([Role.User, Role.Admin]), async (request, response) => {
	try {
      const users = await User.find({}, {
      	_id: 0,
      	id: "$_id",
      	[request.t('userschema_username')]: "$username",
      	[request.t('userschema_createdat')]: {
      		$dateToString: { format: "%d-%m-%Y %H:%M:%S", date: "$createdAt" }
      	},
      	[request.t('userschema_emailIsConfirmed')]: "$emailIsConfirmed",
      	[request.t('userschema_role')]: "$role"
      });

      if (users.length === 0) {
        throw new Error(request.t('user_empty'));
      }

      return response.status(200).json({
        success: true,
        users
      });
    } catch (error) {
      return response.status(400).json(handleError(error, request));
    }
});

router.route('/account/update').post(authorized(), async (request, response) => {
	try {
		const { username, email } = request.body;

		const user = await User.findById(request.user.id);

		let emailIsConfirmed = user.emailIsConfirmed;

		if (!user) {
			throw new Error(request.t('user_notfound'));
		}

		if(email !== user.email && user.emailIsConfirmed === 'true') {
			emailIsConfirmed = 'false';
		}

		await User.findByIdAndUpdate(request.user.id, { username, email, emailIsConfirmed: emailIsConfirmed }, {
	        new: false,
	        runValidators: true,
	    }); // {new: false} Para retornar a versão antiga do bcd, {runValidators: true} Para validar os campos antes do update
		
		return response.json({
			'success': true,
			'message': request.t('user_updated')
		});

	} catch (error) {
		return response.status(400).json(handleError(error, request));
	}
});

router.route('/account/delete').delete(authorized(), async (request, response) => {
	try {
		const user = await User.findByIdAndDelete(request.user.id);

		if(!user) {
			throw new Error(request.t('user_notfound'));
		}

		await RefreshToken.findOneAndDelete({user: request.user.id});

		return response.json({
			'success': true,
			'message': request.t('user_accountremoved')
		});

	} catch (error) {
		return response.status(400).json(handleError(error, request));
	}
});

router.route('/password-update').post(authorized(), async (request, response) => {
	try {
		const { actualPassword, newPassword } = request.body;

		const user = await User.findById(request.user.id).select("+password");

		if(!user) {
			throw new Error(request.t('user_notfound'));
		}

		if (!(await bcrypt.compare(actualPassword, user.password))) {
	      throw new Error(request.t('user_currentpassincorrect'));
	    }

		user.password = newPassword;

		await user.save();

		return response.json({
			'success': true,
			'message': request.t('user_passupdated')
		});
	} catch (error) {
		return response.status(400).json(handleError(error, request));
	}
});

router.route('/account').get(authorized(), async (request, response) => {
	try {
		
		const user = await User.findById(request.user.id).select({
			_id: 0,
			username: 1,
			email: 1
		});

		if(!user) {
			throw new Error(request.t('user_notfound'));
		}

		return response.json({
			'success': true,
			user
		});
	} catch (error) {
		return response.status(400).json(handleError(error, request));
	}
});

router.route('/:id').delete(authorized([Role.User, Role.Admin]), async (request, response) => {
	try {
		if(request.user.role === Role.Admin) {
			const user = await User.findByIdAndDelete(request.params.id);

			if (!user) {
		        throw new Error(request.t('user_notexist'));
		    }
		} else {
			const user = await User.findById(request.params.id);

			if (!user) {
		        throw new Error(request.t('user_notexist'));
		    }

		    if(user.role === Role.Admin) {
		    	throw new Error(request.t('user_admindeleteerror'));
		    }

			if(user.role === Role.User) {
				throw new Error(request.t('user_userdeleteerror'));
			}

			await user.remove();
		}
		
		await RefreshToken.findOneAndDelete({user: request.params.id});

		return response.json({
			'success': true,
			'message': request.t('user_deleted')
		});

	} catch (error) {
		return response.status(400).json(handleError(error, request));
	}
});

router.route('/:id').get(authorized([Role.User, Role.Admin]), async (request, response) => {
	try {
		const user = await User.findById(request.params.id).select({
			_id: 0,
			username: 1
		});
		
		if (!user) {
	        throw new Error(request.t('user_notfound'));
	    }

		return response.json({
			'success': true,
			user
		});

	} catch (error) {
		return response.status(400).json(handleError(error, request));
	}
});

router.route('/update/:id').post(authorized([Role.User, Role.Admin]), async (request, response) => {
	try {
		const { username } = request.body;

		if(request.user.role === Role.Admin) {
			const user = await User.findByIdAndUpdate(request.params.id, { username }, {
		        new: false,
		        runValidators: true,
		    });

			if (!user) {
		        throw new Error(request.t('user_notexist'));
		    }
		} else {
			const user = await User.findById(request.params.id);

			if (!user) {
		        throw new Error(request.t('user_notexist'));
		    }

		    if(user.role === Role.Admin) {
		    	throw new Error(request.t('user_adminupdateerror'));
		    }

			if(user.role === Role.User) {
				throw new Error(request.t('user_userupdateerror'));
			}

			await User.findByIdAndUpdate(request.params.id, { username, email }, {
		        new: false,
		        runValidators: true,
		    });
		}
			
		return response.json({
			'success': true,
			'message': request.t('user_updated')
		});

	} catch (error) {
		return response.status(400).json(handleError(error, request));
	}
});

module.exports = router;