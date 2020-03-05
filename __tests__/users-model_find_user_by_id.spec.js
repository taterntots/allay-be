const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const Users = require('../helpers/users-model');

// test Users DB
describe('Users Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table users cascade');
  });
  // register or add a new user
  describe('findUserById()', () => {
    it('gets a specific user by id', async () => {
      const mock_user_1 = {
        id: 1,
        email: 'test1@gmail.com',
        username: 'IronMan',
        password: 'IAmIronMan'
      };
      const mock_user_2 = {
        id: 2,
        email: 'test2@gmail.com',
        username: 'Thor',
        password: 'GodOfThunder'
      };
      const mock_user_3 = {
        id: 3,
        email: 'test3@gmail.com',
        username: 'Rocket',
        password: 'M3chanic'
      };
      // add the user to the db
      await Users.addUser(mock_user_1);
      await Users.addUser(mock_user_2);
      await Users.addUser(mock_user_3);
      // check the id of the added user
      await Users.findUserById(1);

      const users = await db('users');
      expect(users[0].id).toBe(mock_user_1.id);
    });
  });
});
