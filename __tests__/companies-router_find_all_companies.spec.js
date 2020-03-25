const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

// ********************** TRUNCATE BEFORE EACH TEST *******************************

describe('test company endpoints', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });

  // ********************** GET all companies *******************************

  it('auth, then GET all companies', function() {
    // register new user
    return request(server)
      .post('/api/auth/register')
      .send({
        email: 'ignacio@test.com',
        username: 'ignaciosm',
        password: 'test123',
        track_id: 1
      })
      .then(res_signup => {
        expect(res_signup.status).toBe(201);
        expect(res_signup.body.id).not.toBeNull();
        console.log('signup successful');

        // login with user created
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'ignaciosm', password: 'test123' })
          .then(res_login => {
            const token = res_login.body.token;
            expect(res_login.status).toBe(200);
            expect(res_login.body.token).not.toBeNull();
            console.log('login successful', res_login.data);

            // GET all companies
            return request(server)
              .get('/api/companies')
              .set('Authorization', token)
              .then(res_get => {
                expect(res_get.status).toBe(200);
                expect(Array.isArray(res_get.body)).toBe(true);
                console.log('get companies succesfull');
              }); // closes res_get
          }); // closes res_login
      }); // closes res_signup
  });
});

// ********************** GET company by ID *******************************
describe('test company endpoints', () => {
  beforeEach(async () => {
    await db.raw('truncate table users restart identity cascade');
  });

  it('auth, then GET company by ID', function() {
    // register new user
    return request(server)
      .post('/api/auth/register')
      .send({
        email: 'ignacio@test.com',
        username: 'ignaciosm',
        password: 'test123',
        track_id: 1
      })
      .then(res_signup => {
        expect(res_signup.status).toBe(201);
        expect(res_signup.body.id).not.toBeNull();
        console.log('signup successful');

        // login with user created
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'ignaciosm', password: 'test123' })
          .then(res_login => {
            const token = res_login.body.token;
            expect(res_login.status).toBe(200);
            expect(res_login.body.token).not.toBeNull();
            console.log('login successful');

            // POST new company
            const new_company = {
              company_name: 'Ignacio Test Company',
              state_id: 5,
              hq_city: 'San Francisco'
            };
            return request(server)
              .post('/api/companies')
              .set('Authorization', token)
              .send(new_company)
              .then(res_post => {
                expect(res_post.status).toBe(201);
                expect(res_post.body.id).toBe(1);
                expect(res_post.body.company_name).toBe(
                  new_company.company_name
                );
                expect(res_post.body.state_id).toBe(new_company.state_id);
                expect(res_post.body.hq_city).toBe(new_company.hq_city);
                console.log('post new company succesful');

                return request(server)
                  .get('/api/companies/1')
                  .set('Authorization', token)
                  .then(res_get => {
                    expect(res_get.status).toBe(200);
                    expect(res_get.body.id).toBe(1);
                    console.log('get company by id succesfull');
                  }); // closes res_get
              }); // closes post

            // GET all companies
          }); // closes res_login
      }); // closes res_signup
  });
});
