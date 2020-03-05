const request = require('supertest');
const server = require('../api/server');
const Users = require('../helpers/users-model');
const db = require('../data/dbConfig');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table users cascade');
    await db.raw('truncate table reviews cascade');
    await db.raw('truncate table companies cascade'); //clears table for testing purposes before each test
  });

  /*************************** GENERAL *******************************/

  it('runs the tests', () => {
    expect(true).toBe(true);
  });
  it('should run the testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});
