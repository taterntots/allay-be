const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const Users = require('./users-model');

//sanity check
describe('server', () => {
	beforeEach(async () => {
		await db('users').truncate();
	});
	// confirm tests are running
	it('runs the tests', () => {
		expect(true).toBe(true);
	});
	// confirm test env
	describe('test env', () => {
		it('should run the testing env', () => {
			expect(process.env.DB_ENV).toBe('testing');
		});
	});
});

// test Users DB
describe('Users Model', () => {
	// register or add a new user
	describe('addUser()', () => {
		it('should register/add a new user', async () => {
			await Users.addUser({
				email: 'test@gmail.com',
				username: 'test',
				password: 'test123'
			});

			const users = await db('users');
			expect(users).toHaveLength(1);
		});
	});
});
