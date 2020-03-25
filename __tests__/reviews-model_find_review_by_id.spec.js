const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');
const User = require('../helpers/users-model');

describe('Reviews Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });
  describe('findReviewById()', () => {
    it('can find a specific review', async () => {
      const review_1 = {
        id: 1,
        job_title: 'engineer',
        state_id: 5,
        city: 'San Diego',
        salary: 500,
        user_id: 1,
        company_name: 'Ignacio Test Company',
        review_type_id: 1
      };
      const review_2 = {
        id: 2,
        job_title: 'engineer',
        state_id: 5,
        city: 'San Diego',
        salary: 500,
        user_id: 1,
        company_name: 'Ignacio Test Company',
        review_type_id: 1
      };
      const review_3 = {
        id: 3,
        job_title: 'engineer',
        state_id: 5,
        city: 'San Diego',
        salary: 500,
        user_id: 1,
        company_name: 'Ignacio Test Company',
        review_type_id: 1
      };

      const company_1 = {
        id: 1,
        company_name: 'Ignacio Test Company',
        state_id: 5,
        hq_city: 'San Diego'
      };

      const user_1 = {
        id: 1,
        username: 'ignacio',
        email: 'ignacio@gmail.com',
        password: 'ignacio',
        track_id: 2
      };

      // add user
      await User.addUser(user_1);
      // add the companies
      await Company.addCompany(company_1);
      // add the reviews
      await Reviews.addReview(review_1);
      await Reviews.addReview(review_2);
      await Reviews.addReview(review_3);

      await Reviews.findReviewsById(2);

      const reviews = await db('reviews');
      expect(reviews[1].interview_rating).toBe(review_2.interview_rating);
    });
  });
});
