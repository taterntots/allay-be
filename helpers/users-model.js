const db = require('../data/dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  findUsers,
  findUsersBy,
  findUserById,
  findUserReviews,
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

function findUserReviews(userId) {
  return db('reviews')
    .where('user_id', userId)
    .then(reviews => reviews.map(review => mappers.reviewToBody(review)));
}

function addUser(user) {
  return db('users')
    .insert(user)
    .then(([id]) => {
      return findUserById(id);
    });
}

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findUserById(id) : null));
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}
