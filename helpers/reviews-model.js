const db = require('../data/dbConfig.js');

module.exports = {
  findReviews,
  findReviewsBy,
  findReviewById,
  addReview
};

//Create some functions!

function findReviews() {
  return db('reviews');
}

function findReviewsBy(filter) {
  return db('reviews').where(filter);
}

function findReviewById(id) {
  return db('reviews')
    .where({ id })
    .first();
}

function addReview(review) {
  return db('reviews')
    .insert(review)
    .then(ids => {
      const [id] = ids;
      return findReviewById(id);
    });
}
