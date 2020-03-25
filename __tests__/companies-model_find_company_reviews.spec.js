const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');
const User = require('../helpers/users-model');

describe.skip('Companies Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });

  describe('findCompanyReviews()', () => {
    it('can add a new company, submit a new review, then find reviews associated with a company', async () => {
      // POST new user
      const user_1 = {
        username: 'ignacio',
        email: 'ignacio@gmail.com',
        password: 'ignacio',
        track_id: 1
      };

      // POST new company
      const review_1 = {
        job_title: 'engineer',
        state_id: 5,
        city: 'San Diego',
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
      // add review for the company
      await Reviews.addReview(review_1);

      const company_review = await Company.findCompanyReviews(1);

      //access db
      const companies = await db('companies');
      // tests
      expect(company_review).toHaveLength(1);
      expect(company_review[0].job_rating).toBe(review_1.job_rating);
    });
  });
});
