const db = require('../data/dbConfig.js');

module.exports = {
  findCompanies,
  findCompaniesBy,
  findCompanyById,
  findCompanyReviews,
  addCompany
};

//Create some functions!

function findCompanies() {
  return db('companies');
}

function findCompaniesBy(filter) {
  return db('companies').where(filter);
}

function findCompanyById(id) {
  return db('companies')
    .where({ id })
    .first();
}

function addCompany(company) {
  return db('companies')
    .insert(company)
    .then(ids => {
      const [id] = ids;
      return findCompanyById(id);
    });
}
