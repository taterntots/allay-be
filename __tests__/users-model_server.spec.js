const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const Users = require('../helpers/users-model');

//sanity check
describe('server', () => {
  beforeEach(async () => {
    await db.raw('truncate table users cascade');
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
