const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table users cascade');
    await db.raw('truncate table reviews cascade');
    await db.raw('truncate table companies cascade'); //clears table for testing purposes before each test
  });

  /*************************** RESTRICTED *******************************/

  describe('Restriction Middleware', () => {
    it('should deny a user access to reviews dashboard with missing token', async () => {
      // get a list of reviews
      res = await request(server).get('/api/reviews');
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({
        errorMessage: 'Must be an authorized user / token is missing'
      });
    });
    it('should deny a user access to companies dashboard with missing token', async () => {
      // get a list of companies
      res = await request(server).get('/api/companies');
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({
        errorMessage: 'Must be an authorized user / token is missing'
      });
    });
    it('should deny a user access to users dashboard with missing token', async () => {
      // get a list of companies
      res = await request(server).get('/api/users');
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({
        errorMessage: 'Must be an authorized user / token is missing'
      });
    });
  });
});
