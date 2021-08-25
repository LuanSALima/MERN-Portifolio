const app = require('../../../app');

const database = require('../../../database');
const databaseName = "merntests"; //Database name for tests

//User mongoose schema
let User = require('../../schemas/user.schema');

//Helpers
const jwtHelper = require('../../helpers/jwt');
const RolesHelper = require('../../helpers/roles');

const supertest = require("supertest");
const request = supertest(app);

//User with Guest Role
let guest = null;
let guestToken = null;

//User with User Role
let user = null;
let userToken = null;

//User with Admin Role
let admin = null;
let adminToken = null;

//Before All tests
beforeAll(async () => {
  	await database.connect(databaseName);

  	//Creating Guest User data
  	guest = {
		username: 'guest',
		email: 'guest@email.com',
		password: '$Guest123$',
		role: RolesHelper.Guest
	};

	//Creating Guest User in Test Database and saving id here
  	guest._id = (await User.create(guest))._id;

  	//Creating JWT Token for Authorization middleware
	guestToken = await jwtHelper.generateToken(guest._id, guest.role);

	//Creating User data
	user = {
		username: 'user',
		email: 'user@email.com',
		password: '$User123$',
		role: RolesHelper.User
	};

	//Creating User in Test Database and saving id here
  	user._id = (await User.create(user))._id;

  	//Creating JWT Token for Authorization middleware
	userToken = await jwtHelper.generateToken(user._id, user.role);

	//Creating Admin data
	admin = {
		username: 'admin',
		email: 'admin@email.com',
		password: '$Admin123$',
		role: RolesHelper.Admin
	};

	//Creating Admin in Test Database and saving id here
	admin._id = (await User.create(admin))._id;

	//Creating JWT Token for Authorization middleware
	adminToken = await jwtHelper.generateToken(admin._id, admin.role);
});

//After all tests are done remove all Users from Test Database
afterAll(async () => {
  await User.deleteMany();
});

describe("GET /users/test", () => {
	it("should return 200 and message should be 'Olá Mundo!'", () => {
		return request.get('/api/users/test')
			.expect(200)
			.then(response => {
				expect(response.body.message).toBe("Olá Mundo!");
			});
	});
});

describe("GET /users/list", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.get('/api/users/list')
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 401, success to be false and message 'Não possui permissão para acessar esta função'", () => {
		return request.get('/api/users/list')
			.set('Authorization', guestToken)
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Não possui permissão para acessar esta função");
			});
	});

	it("should return 200 and success to be true", () => {
		return request.get('/api/users/list')
			.set('Authorization', adminToken)
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
			});
	});
});

describe("GET /users/account", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.get('/api/users/account')
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 200, success to be true and user object with username and email", () => {
		return request.get('/api/users/account')
			.set('Authorization', guestToken)
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.user).toStrictEqual({
					username: guest.username,
					email: guest.email
				});
			});
	});
});

describe("GET /users/{id}", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.get(`/api/users/${guest._id}`)
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 401, success to be false and message 'Não possui permissão para acessar esta função'", () => {
		return request.get(`/api/users/${guest._id}`)
			.set('Authorization', guestToken)
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Não possui permissão para acessar esta função");
			});
	});

	it("should return 200, success to be true and user object with username", () => {
		return request.get(`/api/users/${guest._id}`)
			.set('Authorization', adminToken)
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.user).toStrictEqual({
					username: guest.username
				});
			});
	});
})

describe("POST users/account/update", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.post('/api/users/account/update')
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 200,success to be true, return message 'Usuário atualizado!' and database value be updated", () => {
		const guestBefore = {
			username: guest.username,
			email: guest.email
		};

		guest.username = 'guestUpdated';
		guest.email = 'guestUpdated@email.com';

		return request.post('/api/users/account/update')
			.set('Authorization', guestToken)
			.send({username: 'guestUpdated', email: 'guestUpdated@email.com'})
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.message).toBe("Usuário atualizado!");

				User.findById(guest._id)
					.then(userResponse => {
						expect(userResponse.username).not.toBe(guestBefore.username);
						expect(userResponse.email).not.toBe(guestBefore.email);
					});
			});
	});
});

describe("POST /users/update/{id}", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.post(`/api/users/update/${guest._id}`)
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 401, success to be false and message 'Não possui permissão para acessar esta função'", () => {
		return request.post(`/api/users/update/${guest._id}`)
			.set('Authorization', guestToken)
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Não possui permissão para acessar esta função");
			});
	});

	it("should return 200,success to be true, return message 'Usuário atualizado!' and database value be updated", () => {
		const guestBefore = {
			username: guest.username
		};

		return request.post(`/api/users/update/${guest._id}`)
			.set('Authorization', adminToken)
			.send({username: 'guestUpdatedByAdmin'})
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.message).toBe("Usuário atualizado!");

				User.findById(guest._id)
					.then(userResponse => {
						expect(userResponse.username).not.toBe(guestBefore.username);
					});
			});
	});
})

describe("POST /users/password-update", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.post('/api/users/password-update')
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 400, success to be false, return message 'Senha atual incorreta!", () => {
		return request.post('/api/users/password-update')
			.set('Authorization', guestToken)
			.send({actualPassword: 'incorrectPassword', newPassword: '$GuestUpdated123$'})
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Senha atual incorreta!");
			});
	});

	it("should return 200, success to be true, return message 'Senha alterada com sucesso!", () => {
		return request.post('/api/users/password-update')
			.set('Authorization', guestToken)
			.send({actualPassword: guest.password, newPassword: '$GuestUpdated123$'})
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.message).toBe("Senha alterada com sucesso!");
			});
	});
});

describe("DELETE /users/{id}", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.delete(`/api/users/${guest._id}`)
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 401, success to be false and message 'Não possui permissão para acessar esta função'", () => {
		return request.delete(`/api/users/${guest._id}`)
			.set('Authorization', guestToken)
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Não possui permissão para acessar esta função");
			});
	});

	it("should return 400, success to be false and message 'Não é possível excluir um usuário que possui o e-mail confirmado'", () => {
		return request.delete(`/api/users/${user._id}`)
			.set('Authorization', userToken)
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Não é possível excluir um usuário que possui o e-mail confirmado");
			});
	});

	it("should return 400, success to be false and message 'Não é possível excluir um usuário administrador'", () => {
		return request.delete(`/api/users/${admin._id}`)
			.set('Authorization', userToken)
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Não é possível excluir um usuário administrador");
			});
	});

	it("should return 200, success to be true, return message 'Usuário deletado!'", () => {
		return request.delete(`/api/users/${guest._id}`)
			.set('Authorization', userToken)
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.message).toBe("Usuário deletado!");
			});
	});
})

describe("DELETE /users/account/delete", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.delete('/api/users/account/delete')
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 200, success to be true, return message 'Conta excluída com sucesso!'", () => {
		return request.delete('/api/users/account/delete')
			.set('Authorization', userToken)
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.message).toBe("Conta excluída com sucesso!");
			});
	});
});

