const csv = require('csvtojson');

exports.seed = (knex, Promise) => {
	return csv({
		trim: true,
		headers: ['name'],
		delimiter: ','
	})
		.fromFile('./data/seeds/industries.csv')
		.then(jsonObj => {
			return knex('industries').insert(jsonObj);
		});
};