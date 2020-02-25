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
			'r.id',
			'r.job_title',
			'r.job_location',
			'r.salary',
			'r.interview_review',
			'r.interview_rating',
			'r.job_review',
			'r.job_rating',
			'u.username as reviewer',
			'c.name as company_name'
		)
		.join('users as u', 'r.user_id', 'u.id')
		.join('companies as c', 'r.company_id', 'c.id');
}

function findReviewsBy(filter) {
	return db('reviews').where(filter);
}

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
			'u.username as reviewer',
			'c.name as company_name'
		)
		.join('users as u', 'r.user_id', 'u.id')
		.join('companies as c', 'r.company_id', 'c.id')
		.where('r.id', id)
		.first();
}

function addReview(review) {
	return db('reviews')
		.insert(review, 'id')
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
