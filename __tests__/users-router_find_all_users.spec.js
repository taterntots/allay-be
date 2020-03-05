const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

/************** BEGIN GET TEST *****************/
describe('GET TEST', () => {
  /*
   */
  describe('GET all USERS /api/users/all', () => {
    beforeEach(async () => {
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

      //make GET request for info
      const res3 = await request(server)
        .get('/api/users/all')
        .set('Authorization', token);
      expect(res3.type).toBe('application/json');
      expect([
        { id: '1' },
        { username: 'test' },
        { email: 'test@test.com' }
      ]).toMatchObject([
        { id: '1' },
        { username: 'test' },
        { email: 'test@test.com' }
      ]);
    });
  });
});

/************** END GET TEST *****************/
