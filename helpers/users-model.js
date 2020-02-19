const db = require('../data/dbConfig.js');

module.exports = {
  findUsers,
  findUsersBy,
  findUsersById,
  addUsers
};

//Create some functions!

function findUsers() {
  return db('users');
}

function findUsersBy(filter) {
  return db('users').where(filter);
}

function findUsersById(id) {
  return db('users as u')
    .select('u.id', 'u.username')
    .where({ id });
}

function addUsers(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findUsersById(id);
    });
}
