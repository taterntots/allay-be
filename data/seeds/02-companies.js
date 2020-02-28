const seeder = require('knex-csv-seeder');

exports.seed = seeder({
  table: 'companies',
  file: '../list-of-companies.csv'
})

// exports.seed = function (knex) {
//   // Deletes ALL existing entries
//   return knex('users').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('users').insert()
//     })
// }

// const faker = require('faker');

// const createFakeCompany = () => ({
//   name: faker.company.companyName(),
//   hq_city: faker.address.city(),
//   hq_state: faker.address.state()
// });

// exports.seed = function(knex) {
//   // Creates 50 fake companies
//   const fakeCompanies = [];
//   const desiredFakeCompanies = 50;
//   for (let i = 0; i < desiredFakeCompanies; i++) {
//     fakeCompanies.push(createFakeCompany());
//   }
//   // Deletes ALL existing entries
//   return knex('companies')
//     .del()
//     .then(function() {
//       // Inserts seed entries
//       return knex('companies').insert(fakeCompanies);
//     });
// };
