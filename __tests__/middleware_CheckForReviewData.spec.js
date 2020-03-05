const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');

describe('server.js', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
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
        });
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
      expect(res.body).toMatchObject({
        errorMessage:
          'job title, job location, salary, and company id are required'
      });
    });
    it('should 400 error if job_location is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        });
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
      expect(res.body).toMatchObject({
        errorMessage:
          'job title, job location, salary, and company id are required'
      });
    });
    it('should 400 error if salary is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        });
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
      expect(res.body).toMatchObject({
        errorMessage:
          'job title, job location, salary, and company id are required'
      });
    });
    it('should 400 error if company_id is missing from body', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        });
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
      expect(res.body).toMatchObject({
        errorMessage:
          'job title, job location, salary, and company id are required'
      });
    });
    it('should 400 error if review body is empty', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'mario',
          password: 'superstar',
          email: 'mario@gmail.com'
        });
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
      // create a review
      res = await request(server)
        .post('/api/users/1/reviews')
        .send()
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.status).toEqual(400);
      expect(res.body).toMatchObject({
        errorMessage: 'body is empty / missing review data'
      });
    });
  });
});
