exports.up = function(knex) {
  return knex.schema.createTable('states', tbl => {
    tbl.increments();
    tbl.string('abbreviation').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('states');
};
