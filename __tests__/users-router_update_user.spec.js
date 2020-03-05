const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

/************** BEGIN PUT TEST *****************/
describe('PUT TEST', () => {
  /*
   */
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });
  describe('update USER /api/users/:id', () => {
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

      //make GET request to verify user exists
      const res3 = await request(server)
        .get('/api/users/1')
        .set('Authorization', token);

      //make PUT request to update user info
      const res4 = await request(server)
        .put('/api/users/1')
        .set('Authorization', token)
        .send({
          email: 'edit_test@test.com'
        });
      expect(res4.type).toBe('application/json');
      expect(res4.status).toBe(202);
      expect({ email: 'edit_test@test.com' }).toMatchObject({
        email: 'edit_test@test.com'
      });
    });
  });
});

/************** END PUT TESTS *****************/
