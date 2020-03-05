const request = require('supertest');
const server = require('../api/server');
const Users = require('../helpers/users-model');
const db = require('../data/dbConfig');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });

  /*************************** LOGIN *******************************/

  describe('POST /auth/login', () => {
    it('should return JSON', async () => {
      return request(server)
        .post('/api/auth/login')
        .then(res => {
          //check that request returns JSON
          expect(res.type).toMatch(/json/i);
        });
    });
    it('should return 200 OK status when logged in successfully', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy'
        });
      //open the database and see that the new user is there
      const newUsers = await db('users');
      //check that the username is spelled correctly
      expect(newUsers[0].username).toBe('banjo-kazooie');
      //checks response to see if login was successful
      expect(res.status).toEqual(200);
    });
    it('should return 500 error status when password is incorrect', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'samus',
          password: 'metroid',
          email: 'samus@zebes.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'samus',
          password: 'ridley'
        });
      expect(res.status).toEqual(401);
    });
    it('should return 500 error status when username is incorrect', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'kirby',
          password: 'food',
          email: 'kirby@planetpopstar.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'kirby',
          password: 'allTheFood'
        });
      expect(res.status).toEqual(401);
    });
    it('should generate a token on successful login', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'megaman',
          password: 'rush',
          email: 'megaman@20XX.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'megaman',
          password: 'rush'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
    });
    it('should get a list of reviews on successful login with token', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'papyrus',
          password: 'spaghetti',
          email: 'papyrus@snowdin.com'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'papyrus',
          password: 'spaghetti'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // grant access to users with token
      res = await request(server)
        .get('/api/reviews')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.body).toBeInstanceOf(Array);
      expect(res.status).toBe(200);
    });
  });
});
