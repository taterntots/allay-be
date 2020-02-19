const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  add
};

//Create some functions!

function find() {
  return db('users');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users as u')
    .select('u.id', 'u.username')
    .where({ id });
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
