const db = require('../data/dbConfig.js');

module.exports = {
  findReviews,
  findReviewsBy,
  findReviewById,
  addReview,
  updateReview,
  deleteReview
};

//Create some functions!

function findReviews() {
  return db('reviews as r')
    .select(
      'r.review_id',
      'r.job_title',
      'r.job_location',
      'r.salary',
      'r.interview',
      'r.interview_rating',
      'r.review',
      'r.review_rating',
      'r.user_id',
      'u.username as reviewer',
      'r.company_id',
      'c.name as company_name'
    )
    .join('users as u', 'r.user_id', 'u.id')
    .join('companies as c', 'r.company_id', 'c.id');
}

function findReviewsBy(filter) {
  return db('reviews').where(filter);
}

function findReviewById(id) {
  return db('reviews')
    .where({ id })
    .select(
      'r.review_id',
      'r.job_title',
      'r.job_location',
      'r.salary',
      'r.interview',
      'r.interview_rating',
      'r.review',
      'r.review_rating',
      'r.user_id',
      'u.username as reviewer',
      'r.company_id',
      'c.name as company_name'
    )
    .join('users as u', 'r.user_id', 'u.id')
    .join('companies as c', 'r.company_id', 'c.id')
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

function updateReview(id, changes) {
  return db('reviews')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findReviewById(id) : null));
}

function deleteReview(id) {
  return db('reviews')
    .where({ id })
    .del();
}
