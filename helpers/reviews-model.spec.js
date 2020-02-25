const db = require('../data/dbConfig');
const Reviews = require('./reviews-model');

describe('Reviews Model', () => {
	beforeEach(async () => {
		await db('reviews').truncate();
	});
	describe('addReview()', () => {
		it('can add a new review', async () => {
			const review_1 = {
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 2,
				user_id: 1,
				company_id: 4
			};
			await Reviews.addReview(review_1);

			const reviews = await db('reviews');
			expect(reviews).toHaveLength(1);
			expect(reviews[0].user_id).toBe(review_1.user_id);
		});
	});
	describe('updateReview()', () => {
		it('can update a review', async () => {
			const review_1 = {
				id: 1,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 2,
				user_id: 1,
				company_id: 4
			};
			const review_2 = {
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 4,
				user_id: 2,
				company_id: 3
			};
			const review_3 = {
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 1,
				job_review: 'more info',
				job_rating: 5,
				user_id: 4,
				company_id: 5
			};
			const review_1_update = {
				id: 1,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 200,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 2,
				user_id: 1,
				company_id: 4
			};
			await Reviews.addReview(review_1);
			await Reviews.addReview(review_2);
			await Reviews.addReview(review_3);

			await Reviews.updateReview(1, review_1_update);

			const reviews = await db('reviews');
			expect(reviews).toHaveLength(3);
			expect(reviews[0].salary).toBe(review_1_update.salary);
		});
	});
	describe('deleteReview()', () => {
		it('can delete a review', async () => {
			const review_1 = {
				id: 1,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 2,
				user_id: 1,
				company_id: 4
			};
			const review_2 = {
				id: 2,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 4,
				user_id: 2,
				company_id: 3
			};
			const review_3 = {
				id: 3,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 1,
				job_review: 'more info',
				job_rating: 5,
				user_id: 4,
				company_id: 5
			};

			await Reviews.addReview(review_1);
			await Reviews.addReview(review_2);
			await Reviews.addReview(review_3);

			await Reviews.deleteReview(3);

			const reviews = await db('reviews');
			expect(reviews).toHaveLength(2);
		});
	});
	describe('findReviewById()', () => {
		it('can find a specific review', async () => {
			const review_1 = {
				id: 1,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 2,
				user_id: 1,
				company_id: 4
			};
			const review_2 = {
				id: 2,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 3,
				job_review: 'more info',
				job_rating: 4,
				user_id: 2,
				company_id: 3
			};
			const review_3 = {
				id: 3,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 1,
				job_review: 'more info',
				job_rating: 5,
				user_id: 4,
				company_id: 5
			};

			await Reviews.addReview(review_1);
			await Reviews.addReview(review_2);
			await Reviews.addReview(review_3);

			await Reviews.findReviewById(2);

			const reviews = await db('reviews');
			expect(reviews[1].interview_rating).toBe(review_2.interview_rating);
		});
	});
});
