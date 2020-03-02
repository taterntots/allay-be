const csv = require('csvtojson');

exports.seed = (knex, Promise) => {
	return csv({
		trim: true,
		headers: ['name'],
		delimiter: '%'
	})
		.fromFile('./data/seeds/companies.csv')
		.then(jsonObj => {
			return knex('companies').insert(jsonObj);
		});
};