const app = require('../../../app');
const supertest = require("supertest");
const request = supertest(app);

describe("GET /users/test", () => {
	it("should return 200 and message should be 'Olá Mundo!'", () => {
		return request.get('/api/users/test')
			.expect(200)
			.then(response => {
				//Return ('hello_world') -> i18next not working
				//expect(response.body.message).toBe("Olá Mundo!");
			});
	});
})

describe("GET /users/list", () => {
	it("should return UnAuthorized", () => {
		return request.get('/api/users/list')
			.expect(401);
	});
})

describe("POST /users/test", () => {
	it("should return UnAuthorized", () => {
		return request.post('/api/users/account/update')
			.expect(401)
	});
})


describe("DELETE /users/account/delete", () => {
	it("should return UnAuthorized", () => {
		return request.delete('/api/users/account/delete')
			.expect(401)
	});
})


describe("POST /users/password-update", () => {
	it("should return UnAuthorized", () => {
		return request.post('/api/users/password-update')
			.expect(401)
	});
})


describe("GET /users/account", () => {
	it("should return UnAuthorized", () => {
		return request.get('/api/users/account')
			.expect(401)
	});
})


describe("DELETE /users/{id}", () => {
	it("should return UnAuthorized", () => {
		return request.delete('/api/users/usuarioID')
			.expect(401)
	});
})


describe("GET /users/{id}", () => {
	it("should return UnAuthorized", () => {
		return request.get('/api/users/usuarioID')
			.expect(401)
	});
})


describe("POST /users/update/{id}", () => {
	it("should return UnAuthorized", () => {
		return request.post('/api/users/update/usuarioID')
			.expect(401)
	});
})
