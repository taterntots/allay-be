exports.up = function(knex) {
  return knex.schema.createTable('types', tbl => {
    tbl.increments();
    tbl.string('type').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('types');
};
