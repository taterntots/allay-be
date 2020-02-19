const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  add
};

//Create some functions!

function find() {
  return db('reviews');
}

function findBy(filter) {
  return db('reviews').where(filter);
}

function findById(id) {
  return db('reviews')
    .where({ id })
    .first();
}

function add(review) {
  return db('reviews')
    .insert(review)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
