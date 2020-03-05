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
        });
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'username, password, and email fields are required'
      });
    });
    it('should 400 error if password is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: '',
          email: 'toad@gmail.com'
        });
      //deny user registration due to missing password
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'username, password, and email fields are required'
      });
    });
    it('should 400 error if email is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'ImTheBest',
          email: ''
        });
      //deny user registration due to missing email
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'username, password, and email fields are required'
      });
    });
    it('should 400 error if body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send();
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'body is empty / missing registration data'
      });
    });
  });
});
