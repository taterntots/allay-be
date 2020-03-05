const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');

describe('Companies Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews cascade');
    await db.raw('truncate table companies restart identity cascade ');
  });
  describe('addCompany()', () => {
    it('can add a new company', async () => {
      // POST new company
      const new_company = {
        name: 'Ignacio Test Company',
        hq_state: 'California',
        hq_city: 'San Francisco'
      };
      await Company.addCompany(new_company);

      //access db
      const companies = await db('companies');
      // tests
      expect(companies).toHaveLength(1);
      expect(companies[0].name).toBe(new_company.name);
    });
  });
});
