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

  /*************************** RESTRICTED *******************************/

  describe('Restriction Middleware', () => {
    it('should deny a user access to reviews dashboard with missing token', async () => {
      // get a list of reviews
      res = await request(server)
        .get('/api/reviews')
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({ errorMessage: 'Must be an authorized user / token is missing' });

    });
    it('should deny a user access to companies dashboard with missing token', async () => {
      // get a list of companies
      res = await request(server)
        .get('/api/companies')
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({ errorMessage: 'Must be an authorized user / token is missing' });
    });
    it('should deny a user access to users dashboard with missing token', async () => {
      // get a list of companies
      res = await request(server)
        .get('/api/users')
      //should deny access without token/login
      expect(res.status).toEqual(401);
      expect(res.body).toMatchObject({ errorMessage: 'Must be an authorized user / token is missing' });
    });
  });

  /*************************** CHECK FOR REGISTER DATA *******************************/

  describe('CheckForRegisterData Middleware', () => {
    it('should 400 error if username is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: '',
          password: 'ImTheBest',
          email: 'toad@gmail.com'
        })
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'username, password, and email fields are required' });
    });
    it('should 400 error if password is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: '',
          email: 'toad@gmail.com'
        })
      //deny user registration due to missing password
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'username, password, and email fields are required' });
    });
    it('should 400 error if email is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'ImTheBest',
          email: ''
        })
      //deny user registration due to missing email
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'username, password, and email fields are required' });
    });
    it('should 400 error if body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send()
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'body is empty / missing registration data' });
    });
  });

  /*************************** CHECK FOR REGISTER DATA *******************************/

});