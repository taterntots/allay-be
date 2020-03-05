const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');
const User = require('../helpers/users-model');

describe('Companies Model', () => {
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
        password: 'ignacio'
      };

      // POST new company
      const review_1 = {
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
        name: 'Ignacio Test Company',
        hq_state: 'California',
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
