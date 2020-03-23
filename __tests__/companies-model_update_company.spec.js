const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');

describe.skip('Companies Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });
  describe('updateCompany()', () => {
    it('can add a an existing company', async () => {
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
      const update_company = {
        name: 'Aaron Test Company',
        hq_state: 'California',
        hq_city: 'San Francisco'
      };

      // add the companies to the database
      await Company.addCompany(new_company);
      await Company.addCompany(new_company_2);
      await Company.addCompany(new_company_3);

      //update the company
      await Company.updateCompany(2, update_company);

      //access db
      const companies = await db('companies');
      // tests
      expect(companies).toHaveLength(3);
      expect(companies[2].name).toBe(update_company.name);
    });
  });
});
