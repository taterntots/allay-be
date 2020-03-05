const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');

describe('Companies Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
    
  });
  describe('findCompanies()', () => {
    it('can add a few companies then find all companies', async () => {
      // POST new company
      const new_company = {
        name: 'Ignacio Test Company',
        hq_state: 'California',
        hq_city: 'San Francisco'
      };
      const new_company_2 = {
        name: 'Spencer Test Company',
        hq_state: 'California',
        hq_city: 'San Francisco'
      };
      const new_company_3 = {
        name: 'Matt Test Company',
        hq_state: 'California',
        hq_city: 'San Francisco'
      };

      // add the companies to the database
      await Company.addCompany(new_company);
      await Company.addCompany(new_company_2);
      await Company.addCompany(new_company_3);

      //access db using the model
      const companies = await Company.findCompanies();
      // tests
      expect(companies).toHaveLength(3);
      expect(companies[2].name).toBe(new_company_3.name);
    });
  });
});
