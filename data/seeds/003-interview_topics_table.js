exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topics')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('topics').insert([
        {
          topic: 'Phone Interview'
        },
        {
          topic: 'Resume Review'
        },
        {
          topic: 'Take-Home Assignments'
        },
        {
          topic: 'Online Coding Tests'
        },
        {
          topic: 'Portfolio Review'
        },
        {
          topic: 'Screen Share'
        },
        {
          topic: 'Open Source Contribution'
        },
        {
          topic: 'Side Projects'
        }
      ]);
    });
};
