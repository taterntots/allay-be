const db = require('../data/dbConfig.js');

module.exports = {
	findCompanies,
	findCompaniesBy,
	findCompanyById,
	findCompanyReviews,
	addCompany,
	updateCompany,
	deleteCompany
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

function findCompanyReviews(companyId) {
	return db('reviews')
		.where('company_id', companyId)
		.then(reviews => reviews.map(review => mappers.reviewToBody(review)));
}

function addCompany(company) {
	return db('companies')
		.insert(company, 'id')
		.then(ids => {
			const [id] = ids;
			return findCompanyById(id);
		});
}

function updateCompany(id, changes) {
	return db('companies')
		.where({ id })
		.update(changes)
		.then(count => (count > 0 ? findCompanyById(id) : null));
}

function deleteCompany(id) {
	return db('companies')
		.where({ id })
		.del();
}
