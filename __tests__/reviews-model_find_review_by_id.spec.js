const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');

describe('Reviews Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews cascade');
    await db.raw('truncate table companies cascade');
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
        tagline: 'The Best Interview Ever!',
        user_id: 1,
        company_id: 1
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
        tagline: 'The Best Interview Ever!',
        user_id: 1,
        company_id: 1
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
        tagline: 'The Best Interview Ever!',
        user_id: 1,
        company_id: 1
      };

      const company_1 = {
        id: 1,
        name: 'Ignacio Test Company',
        hq_state: 'California',
        hq_city: 'San Diego'
      };

      // add the companies
      await Company.addCompany(company_1);

      await Reviews.addReview(review_1);
      await Reviews.addReview(review_2);
      await Reviews.addReview(review_3);

      await Reviews.findReviewById(2);

      const reviews = await db('reviews');
      expect(reviews[1].interview_rating).toBe(review_2.interview_rating);
    });
  });
});
