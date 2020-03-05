const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');

describe('Reviews Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews cascade');
    await db.raw('truncate table companies cascade');
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
        tagline: 'The Best Interview Ever!',
        user_id: 1,
        company_id: 1
      };

      const review_1_update = {
        id: 1,
        job_title: 'engineer',
        job_location: 'Tennessee',
        salary: 5500,
        interview_review: 'some info',
        interview_rating: 3,
        job_review: 'more info',
        job_rating: 2,
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

      // add the reviews
      await Reviews.addReview(review_1);

      await Reviews.updateReview(1, review_1_update);

      const reviews = await db('reviews');
      expect(reviews).toHaveLength(1);
      expect(reviews[0].salary).toBe(review_1_update.salary);
    });
  });
});
