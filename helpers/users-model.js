const db = require('../data/dbConfig.js');

module.exports = {
  findUsers,
  findUsersBy,
  findUserById,
  addUser,
  updateUser,
  deleteUser
};

//Create some functions!

function findUsers() {
  return db('users');
}

function findUsersBy(filter) {
  return db('users').where(filter);
}

function findUserById(id) {
  return db('users as u')
    .select('u.id', 'u.username')
    .where({ id });
}

function addUser(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}
