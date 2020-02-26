const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const Users = require('./users-model');

//sanity check
describe('server', () => {
	beforeEach(async () => {
		await db('users').del();
	});
	// confirm tests are running
	it('runs the tests', () => {
		expect(true).toBe(true);
	});
	// confirm test env
	describe('test env', () => {
		it('should run the testing env', () => {
			expect(process.env.NODE_ENV).toBe('testing');
		});
	});
});

// test Users DB
describe('Users Model', () => {
	beforeEach(async () => {
		await db('users').del();
	});
	// register or add a new user
	describe('addUser()', () => {
		it('can add a user to the DB', async () => {
			//mock users
			const mock_user_1 = {
				email: 'test1@gmail.com',
				username: 'IronMan',
				password: 'IAmIronMan'
			};
			const mock_user_2 = {
				email: 'test2@gmail.com',
				username: 'Thor',
				password: 'GodOfThunder'
			};
			const mock_user_3 = {
				email: 'test3@gmail.com',
				username: 'Rocket',
				password: 'M3chanic'
			};

			await Users.addUser(mock_user_1);
			await Users.addUser(mock_user_2);
			await Users.addUser(mock_user_3);

			const users = await db('users');
			// check they have been added to the db
			expect(users).toHaveLength(3);
			// double check db for a specific username
			expect(users[1].username).toBe(mock_user_2.username);
		});
	});
	describe('findUserById()', () => {
		it('gets a specific user by id', async () => {
			const mock_user_1 = {
				id: 1,
				email: 'test1@gmail.com',
				username: 'IronMan',
				password: 'IAmIronMan'
			};
			const mock_user_2 = {
				id: 2,
				email: 'test2@gmail.com',
				username: 'Thor',
				password: 'GodOfThunder'
			};
			const mock_user_3 = {
				id: 3,
				email: 'test3@gmail.com',
				username: 'Rocket',
				password: 'M3chanic'
			};
			// add the user to the db
			await Users.addUser(mock_user_1);
			await Users.addUser(mock_user_2);
			await Users.addUser(mock_user_3);
			// check the id of the added user
			await Users.findUserById(1);

			const users = await db('users');
			expect(users[0].id).toBe(mock_user_1.id);
		});
	});
});
