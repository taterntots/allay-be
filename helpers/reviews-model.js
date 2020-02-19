const db = require('../data/dbConfig.js');

module.exports = {
  findReviews,
  findReviewsBy,
  findReviewsById,
  addReviews
};

//Create some functions!

function findReviews() {
  return db('reviews');
}

function findReviewsBy(filter) {
  return db('reviews').where(filter);
}

function findReviewsById(id) {
  return db('reviews')
    .where({ id })
    .first();
}

function addReviews(review) {
  return db('reviews')
    .insert(review)
    .then(ids => {
      const [id] = ids;
      return findReviewsById(id);
    });
}
