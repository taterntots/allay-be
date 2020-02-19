const db = require('../data/dbConfig.js');

module.exports = {
  findCompanies,
  findCompaniesBy,
  findCompaniesById,
  addCompanies
};

//Create some functions!

function findCompanies() {
  return db('companies');
}

function findCompaniesBy(filter) {
  return db('companies').where(filter);
}

function findCompaniesById(id) {
  return db('companies')
    .where({ id })
    .first();
}

function addCompanies(company) {
  return db('companies')
    .insert(company)
    .then(ids => {
      const [id] = ids;
      return findCompaniesById(id);
    });
}
