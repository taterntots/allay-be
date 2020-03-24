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
  describe('updateReview()', () => {
    it('can update a review', async () => {
      const user_1 = {
        username: 'ignacio',
        email: 'ignacio@gmail.com',
        password: 'ignacio',
        track_id: 5
      };

      const review_1 = {
        id: 3,
        job_title: 'engineer',
        state_id: 5,
        city: 'San Diego',
        salary: 500,
        user_id: 1,
        company_name: 'Ignacio Test Company',
        review_type_id: 1
      };

      const review_1_update = {
        id: 3,
        job_title: 'Full-stack - engineer',
        state_id: 5,
        city: 'Los Angeles',
        salary: 500,
        user_id: 1,
        company_name: 'Ignacio Test Company',
        review_type_id: 1
      };
      const company_1 = {
        company_name: 'Ignacio Test Company',
        state_id: 5,
        hq_city: 'San Diego'
      };

      // add the user
      await User.addUser(user_1);
      // add the companies
      await Company.addCompany(company_1);
      // add the reviews
      await Reviews.addReview(review_1);
      // update the reviews
      await Reviews.updateReview(1, review_1_update);

      const reviews = await db('reviews');
      expect(reviews).toHaveLength(1);
      expect(reviews[0].salary).toBe(review_1_update.salary);
    });
  });
});
