exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('types').insert([
        {
          type: 'Onsite'
        },
        {
          type: 'Presite'
        },
        {
          type: 'Both Onsite and Presite'
        }
      ]);
    });
};
