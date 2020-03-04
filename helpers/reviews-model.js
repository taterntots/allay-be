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

// FIND ALL REVIEWS
function findReviews() {
	return db('reviews as r')
		.select(
			'r.id',
			'r.job_title',
			'r.job_location',
			'r.salary',
			'r.interview_review',
			'r.interview_rating',
			'r.job_review',
			'r.job_rating',
			'r.tagline',
			'r.offer_received',
			'r.offer_accepted',
			'u.username as reviewer',
			'c.name as company_name',
			'c.id as company_id'
		)
		.join('users as u', 'r.user_id', 'u.id')
		.join('companies as c', 'r.company_id', 'c.id')
		.orderBy('r.id', 'desc');
}

// FIND REVIEWS BY A SPECIFIC FILTER (MUST BE A COLUMN IN THE REVIEWS TABLE AND USE {<ARGUMENT>})
function findReviewsBy(filter) {
	return db('reviews').where(filter);
}

// FIND REVIEW BY ID
function findReviewById(id) {
	return db('reviews as r ')
		.select(
			'r.id',
			'r.job_title',
			'r.job_location',
			'r.salary',
			'r.interview_review',
			'r.interview_rating',
			'r.job_review',
			'r.job_rating',
			'r.tagline',
			'r.offer_received',
			'r.offer_accepted',
			'u.id as user_id',
			'u.username as reviewer',
			'c.name as company_name'
		)
		.join('users as u', 'r.user_id', 'u.id')
		.join('companies as c', 'r.company_id', 'c.id')
		.where('r.id', id)
		.first();
}

// ADD A REVIEW TO THE DATABASE
function addReview(review) {
	return db('reviews')
		.insert(review, 'id')
		.then(ids => {
			const [id] = ids;
			return findReviewById(id);
		});
}

// UPDATE AN EXISTING REVIEW
function updateReview(id, changes) {
	return db('reviews')
		.where({ id })
		.update(changes)
		.then(count => (count > 0 ? findReviewById(id) : null));
}

// DELETE AN EXISTING REVIEW
function deleteReview(id) {
	return db('reviews')
		.where({ id })
		.del();
}
