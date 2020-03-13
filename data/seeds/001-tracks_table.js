exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tracks')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('tracks').insert([
        {
          track_name: 'Data Science'
        },
        {
          track_name: 'Full Stack Web Development'
        },
        {
          track_name: 'iOS Development'
        },
        {
          track_name: 'UX Design'
        }
      ]);
    });
};
