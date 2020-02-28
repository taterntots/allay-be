const request = require('supertest');
const server = require('../api/server');
const Users = require('../helpers/users-model');
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
    // it('should deny a user access to the reviews dashboard due to an expired token', async () => {
    //   // register a user
    //   res = await request(server)
    //     .post('/api/auth/register')
    //     .send({
    //       username: 'toad',
    //       password: 'ImTheBest',
    //       email: 'toad@gmail.com'
    //     })
    //   expect(res.status).toEqual(201);
    //   // check token exists
    //   const token = res.body.token;
    //   expect(token.length).toBeGreaterThan(20);
    //   // jwt.verify(token, 'mySecret', {clockTimestamp: Math.floor(Date.now() / 1000) + (60 * 60) + 1})
    //   // add time for token to expire
    //   // res = await request(server)
    //   //   .get('/api/reviews')
    //   //   .set({ authorization: token, Accept: 'application/json' });
    //   // expect(res.status).toEqual(401);
    //   setTimeout(() => {
    //     request(server)
    //       .get('/api/reviews')
    //       .set({ authorization: token, Accept: 'application/json' });
    //     expect(res.status).toEqual(401);
    //   }, 1500);
    //   expect(res.body).toMatchObject({ errorMessage: 'The provided token is invalid / expired' });
    // });
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

  /*************************** CHECK FOR LOGIN DATA *******************************/

  describe('CheckForLoginData Middleware', () => {
    it('should 400 error if username is missing from body', async () => {
      // login a new user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: '',
          password: 'ImTheBest'
        })
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'username and password fields are required' });
    });
    it('should 400 error if password is missing from body', async () => {
      // login a new user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'toad',
          password: ''
        })
      //deny user registration due to missing password
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'username and password fields are required' });
    });
    it('should 400 error if body is empty', async () => {
      // login a new user
      res = await request(server)
        .post('/api/auth/login')
        .send()
      //deny user registration due to missing username
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'body is empty / missing registration data' });
    });
  });

  /*************************** CHECK FOR COMPANY DATA *******************************/

  describe('CheckForCompanyData Middleware', () => {
    it('should 400 error if company name is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'toadette',
          email: 'toad@gmail.com'
        })
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          name: ''
        })
        .set({ authorization: token, Accept: 'application/json' });
      // deny company registration due to missing company name
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'company name is required' });
    });
    it('should 400 error if company body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'toad',
          password: 'toadette',
          email: 'toad@gmail.com'
        })
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send()
        .set({ authorization: token, Accept: 'application/json' });
      // deny company registration due to empty body
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'body is empty / missing company data' });
    });
  });

  /*************************** CHECK FOR REVIEW DATA *******************************/

  describe('CheckForReviewData Middleware', () => {
    it('should 400 error if job_title is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        })
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          name: 'Super Mario Bros.'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      console.log(res.body);
      // create a review
      res = await request(server)
        .post('/api/users/1/reviews')
        .send({
          job_title: '',
          job_location: 'mushroom kingdom',
          salary: 30000,
          company_id: 1
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'job title, job location, salary, and company id are required' });
    });
    it('should 400 error if job_location is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        })
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          name: 'Super Mario Bros.'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      console.log(res.body);
      // create a review
      res = await request(server)
        .post('/api/users/1/reviews')
        .send({
          job_title: 'plumber',
          job_location: '',
          salary: 30000,
          company_id: 1
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'job title, job location, salary, and company id are required' });
    });
    it('should 400 error if salary is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        })
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          name: 'Super Mario Bros.'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      console.log(res.body);
      // create a review
      res = await request(server)
        .post('/api/users/1/reviews')
        .send({
          job_title: 'plumber',
          job_location: 'mushroom kingdom',
          salary: '',
          company_id: 1
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'job title, job location, salary, and company id are required' });
    });
    it('should 400 error if company_id is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        })
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          name: 'Super Mario Bros.'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      console.log(res.body);
      // create a review
      res = await request(server)
        .post('/api/users/1/reviews')
        .send({
          job_title: 'plumber',
          job_location: 'mushroom kingdom',
          salary: 30000,
          company_id: ''
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'job title, job location, salary, and company id are required' });
    });
    it('should 400 error if review body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        })
      expect(res.status).toEqual(201);
      // check token exists
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // create a new company
      res = await request(server)
        .post('/api/companies')
        .send({
          name: 'Super Mario Bros.'
        })
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(201);
      console.log(res.body);
      // create a review
      res = await request(server)
        .post('/api/users/1/reviews')
        .send()
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({ errorMessage: 'body is empty / missing review data' });
    });
  });

  /*************************** VALIDATE USER BY ID *******************************/



  /*************************** VALIDATE COMPANY BY ID *******************************/



  /*************************** VALIDATE REVIEW BY ID *******************************/



});