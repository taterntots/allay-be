const db = require('../data/dbConfig');

module.exports = {
  findCompanyReviews
  // findCompanyReviewBy,
  // findCompanyReviewById,
  // addCompanyReview,
  // updateCompanyReview,
  // deleteCompanyReview
};

function findCompanyReviews() {
  return db('company_reviews');
}

function findCompanyReviewBy() {
  return db('company_reviews');
}

// function findCompanyReviewById() {}

// function addCompanyReview() {}

// function updateCompanyReview() {}

// function deleteCompanyReview() {}
