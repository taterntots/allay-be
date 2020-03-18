exports.up = function(knex) {
  return knex.schema.createTable('states', tbl => {
    tbl.increments();
    tbl
      .string('abbreviation')
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('states');
};
