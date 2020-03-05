// const csv = require('csvtojson');

// exports.seed = (knex, Promise) => {
// 	return csv({
// 		trim: true,
// 		headers: ['name', 'hq_city', 'hq_state', 'domain', 'industry_name', 'size_range', 'linkedin_url'],
// 		delimiter: ','
// 	})
// 		.fromFile('./data/seeds/companies_test.csv')
// 		.then(jsonObj => {
// 			return knex('companies').insert(jsonObj);
// 		});
// };

// const db = require('../dbConfig.js');

// exports.seed = async function (knex) {
//   // Deletes ALL existing entries
// 	// await db.raw('truncate table reviews cascade');
// 	// await db.raw('truncate table users cascade');
// 	await db.raw('truncate table companies restart identity cascade')
// 	// return knex('companies').truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex('companies').insert[
// 				{
// 					"id": 1,
// 					"name": 1871,
// 					"hq_city": "Chicago",
// 					"hq_state": "IL",
// 					"domain": "1871.com",
// 					"industry_name": "Internet",
// 					"size_range": "201 - 500",
// 					"linkedin_url": "linkedin.com/company/1871-com"
// 				},
// 				{
// 					"id": 2,
// 					"name": "@Home Realty",
// 					"hq_city": "Brea",
// 					"hq_state": "CA",
// 					"domain": "homerealty.com",
// 					"industry_name": "Real Estate",
// 					"size_range": "51 - 200",
// 					"linkedin_url": "linkedin.com/company/-home-realty"
// 				},
// 				{
// 					"id": 3,
// 					"name": "@Properties",
// 					"hq_city": "Chicago",
// 					"hq_state": "IL",
// 					"domain": "atproperties.com",
// 					"industry_name": "Real Estate",
// 					"size_range": "1001 - 5000",
// 					"linkedin_url": "linkedin.com/company/properties"
// 				}
// 			]
//     })
// }

exports.seed = function (knex) {
	return knex('companies').del()
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert[
				{
					"name": 1871,
					"hq_city": "Chicago",
					"hq_state": "IL",
					"domain": "1871.com",
					"industry_name": "Internet",
					"size_range": "201 - 500",
					"linkedin_url": "linkedin.com/company/1871-com"
				},
				{
					"name": "@Home Realty",
					"hq_city": "Brea",
					"hq_state": "CA",
					"domain": "homerealty.com",
					"industry_name": "Real Estate",
					"size_range": "51 - 200",
					"linkedin_url": "linkedin.com/company/-home-realty"
				},
				{
					"name": "@Properties",
					"hq_city": "Chicago",
					"hq_state": "IL",
					"domain": "atproperties.com",
					"industry_name": "Real Estate",
					"size_range": "1001 - 5000",
					"linkedin_url": "linkedin.com/company/properties"
				}
			]
    })
}