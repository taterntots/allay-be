const db = require('../data/dbConfig');

module.exports = {
  findCompanyReviews,
  findCompanyReviewBy,
  findCompanyReviewById,
  addCompanyReview,
  updateCompanyReview,
  deleteCompanyReview
};

// FIND ALL COMPANY REVIEWS
function findCompanyReviews() {
  return db('company_reviews as cr')
    .select(
      'cr.id as company_review_id',
      'cr.job_title',
      'cr.start_date',
      'cr.end_date',
      'cr.comment',
      'cr.typical_hours',
      'cr.salary',
      'cr.job_rating',
      'u.username as username',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'u.id as user_id',
      'cr.created_at',
      'cr.updated_at'
    )
    .join('users as u', 'cr.user_id', 'u.id')
    .join('companies as c', 'cr.company_id', 'c.id')
    .join('work_status as ws', 'cr.work_status_id', 'ws.id');
}

// FIND COMPANY REVIEWS BY A SPECIFIC FILTER
function findCompanyReviewBy(filter) {
  return db('company_reviews').where(filter);
}

// FIND COMPANY REVIEW BY ID
function findCompanyReviewById(revId) {
  return db('company_reviews as cr')
    .select(
      'cr.id as company_review_id',
      'cr.job_title',
      'cr.start_date',
      'cr.end_date',
      'cr.comment',
      'cr.typical_hours',
      'cr.salary',
      'cr.job_rating',
      'u.username as username',
      'c.company_name',
      'c.domain as logo',
      'ws.work_status ',
      'u.id as user_id',
      'cr.created_at',
      'cr.updated_at'
    )
    .where('cr.id', revId)
    .join('users as u', 'cr.user_id', 'u.id')
    .join('companies as c', 'cr.company_id', 'c.id')
    .join('work_status as ws', 'cr.work_status_id', 'ws.id')
    .first();
}

// ADD A NEW COMPANY REVIEW
function addCompanyReview(newReview) {
  return db('company_reviews as cr')
    .insert(newReview, 'id')
    .then(([id]) => {
      return findCompanyReviewById(id);
    });
}

// UPDATE AN EXISTING COMPANY REVIEW
function updateCompanyReview(id, changes) {
  return db('company_reviews as cr')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findCompanyReviewById(id) : null));
}

// DELETE AN EXISTING COMPANY REVIEW
function deleteCompanyReview(id) {
  return db('company_reviews')
    .where({ id })
    .del();
}
