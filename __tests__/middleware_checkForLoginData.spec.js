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

  /*************************** CHECK FOR LOGIN DATA *******************************/

  describe('CheckForLoginData Middleware', () => {
    it('should 400 error if username is missing from body', async () => {
      // login a new user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: '',
          password: 'ImTheBest'
        });
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'username and password fields are required'
      });
    });
    it('should 400 error if password is missing from body', async () => {
      // login a new user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'toad',
          password: ''
        });
      //deny user registration due to missing password
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'username and password fields are required'
      });
    });
    it('should 400 error if body is empty', async () => {
      // login a new user
      res = await request(server)
        .post('/api/auth/login')
        .send();
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'body is empty / missing registration data'
      });
    });
  });
});
