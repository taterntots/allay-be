const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

/************** BEGIN POST TEST *****************/
describe('POST TEST', () => {
  /*
   */
  describe('add new REVIEW /api/reviews', () => {
    beforeEach(async () => {
      await db.raw('truncate table reviews restart identity cascade');
      await db.raw('truncate table companies restart identity cascade');
      await db.raw('truncate table users restart identity cascade');
    });
    /*
     */
    //make POST request to register
    it('should register, login, get token and display json', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: '1234',
          track_id: 5
        });
      expect(res.status).toBe(201);

      //make POST request to login and get token
      const res2 = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: '1234'
        });
      expect(res2.status).toBe(200);
      const token = res2.body.token; //store login token

      //make POST request to add company
      const res3 = await request(server)
        .post('/api/companies')
        .set('Authorization', token)
        .send({
          company_name: 'Ignacio Test Company',
          state_id: 5,
          hq_city: 'San Diego'
        });
      expect(res3.status).toBe(201);

      //make POST request to add review
      const res4 = await request(server)
        .post('/api/users/1/add-review')
        .set('Authorization', token)
        .send({
          id: 3,
          job_title: 'Full-stack Web Developer',
          state_id: 5,
          city: 'Los Angeles',
          salary: 500,
          user_id: 1,
          company_name: 'Ignacio Test Company',
          review_type_id: 1
        });
      expect(res4.type).toBe('application/json');
      expect(res4.status).toBe(201);
    });
  });
});

/************** END POST TESTS *****************/
