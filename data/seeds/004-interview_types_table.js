exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('types').insert([
        {
          type: 'Onsite Interview'
        },
        {
          type: 'Presite Interview'
        },
        {
          type: 'Both Onsite and Presite Interviews'
        }
      ]);
    });
};
