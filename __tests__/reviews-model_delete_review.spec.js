const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');

describe('Reviews Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
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

      await Reviews.deleteReview(1);

      const reviews = await db('reviews');
      expect(reviews).toHaveLength(0);
    });
  });
});
