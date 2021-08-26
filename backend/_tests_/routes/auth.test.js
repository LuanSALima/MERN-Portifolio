const app = require('../../../app');

const database = require('../../../database');
const databaseName = "merntests"; //Database name for tests

//User mongoose schema
let User = require('../../schemas/user.schema');

const supertest = require("supertest");
const request = supertest(app);

//User with User Role
let user = {
	username: 'user',
	email: 'user@email.com',
	password: '$User123$'
};

let userAccessToken = null;
let userRefreshToken = null;

//Before All tests
beforeAll(async () => {
  	await database.connect(databaseName);
});

//After all tests are done remove all Users from Test Database
afterAll(async () => {
  await User.deleteMany();
});

describe("POST /auth/signUp", () => {
	it("should return 400, success to be false and errors to be a array", () => {
		return request.post('/api/auth/signUp')
			.send({
				username: '',
				email: '',
				password: ''
			})
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(typeof response.body.errors).toBe('object');
			});
	});

	it("should return 200, success to be true and message should be 'Usuário cadastrado!'", () => {
		return request.post('/api/auth/signUp')
			.send({
				username: user.username,
				email: user.email,
				password: user.password
			})
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.message).toBe("Usuário cadastrado!");
			});
	});
});

describe("GET /auth/authenticate", () => {
	it("should return 400, success to be false and message to be 'Usuário não encontrado!'", () => {
		return request.post('/api/auth/authenticate')
			.send({
				email: '',
				password: ''
			})
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe('Usuário não encontrado!');
			});
	});

	it("should return 400, success to be false and message to be 'Senha incorreta'", () => {
		return request.post('/api/auth/authenticate')
			.send({
				email: user.email,
				password: ''
			})
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe('Senha incorreta');
			});
	});

	it("should return 200, success to be true and message should be 'Usuário cadastrado!'", () => {
		return request.post('/api/auth/authenticate')
			.send({
				email: user.email,
				password: user.password
			})
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				
				expect(typeof response.body.user).toBe('object');

				expect(response.body.user.username).toBe(user.username);
				expect(response.body.user.email).toBe(user.email);

				expect(typeof response.body.accessToken).toBe('string');
				expect(typeof response.body.refreshToken).toBe('string');

				user = response.body.user;
				userAccessToken = response.body.accessToken;
				userRefreshToken = response.body.refreshToken;
			});
	});
});

describe("POST /auth/refresh-token", () => {
	it("should return 400, success to be false and message 'Token de atualização necessário!'", () => {
		return request.post('/api/auth/refresh-token')
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("Token de atualização necessário!");
			});
	});

	it("should return 400, success to be false and message 'O token de atualização não existe!'", () => {
		return request.post('/api/auth/refresh-token')
			.send({
				refreshToken: 'refreshTokenInvalid'
			})
			.expect(400)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("O token de atualização não existe!");
			});
	});

	it("should return 200, success to be true and message should be 'Controller acessado!'", () => {
		return request.post('/api/auth/refresh-token')
			.send({
				refreshToken: userRefreshToken
			})
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(typeof response.body.user).toBe('object');

				expect(response.body.user.username).toBe(user.username);
				expect(response.body.user.email).toBe(user.email);

				expect(typeof response.body.accessToken).toBe('string');
				expect(typeof response.body.refreshToken).toBe('string');
			});
	});
});

describe("GET /auth/testAuthMiddleware", () => {
	it("should return 401, success to be false and message 'É necessário estar logado para acessar esta função'", () => {
		return request.get('/api/auth/testAuthMiddleware')
			.expect(401)
			.then(response => {
				expect(response.body.success).toBe(false);
				expect(response.body.message).toBe("É necessário estar logado para acessar esta função");
			});
	});

	it("should return 200, success to be true and message should be 'Controller acessado!'", () => {
		return request.get('/api/auth/testAuthMiddleware')
			.set('Authorization', userAccessToken)
			.expect(200)
			.then(response => {
				expect(response.body.success).toBe(true);
				expect(response.body.message).toBe("Controller acessado!");
			});
	});
});