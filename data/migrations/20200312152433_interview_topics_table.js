exports.up = function(knex) {
  return knex.schema.createTable('topics', tbl => {
    tbl.increments();
    tbl.string('topic').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('topics');
};
