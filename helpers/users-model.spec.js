const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

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
