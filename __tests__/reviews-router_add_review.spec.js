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
          password: '1234'
        });

      //make POST request to login and get token
      const res2 = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: '1234'
        });
      const token = res2.body.token; //store login token

      //make POST request to add trip
      const res3 = await request(server)
        .post('/api/reviews')
        .set('Authorization', token)
        .send({
          id: '101',
          job_title: 'test job title',
          job_location: 'florida',
          salary: '100000',
          interview_review: 'testing interview review',
          interview_rating: '3',
          job_review: 'testimg job review',
          job_rating: '4',
          tagline: 'The Best Interview Ever!',
          user_id: '1',
          company_id: '1'
        });
      expect(res3.type).toBe('application/json');
      expect(res3.status).toBe(201);
    });
  });
});

/************** END POST TESTS *****************/
