exports.up = function(knex) {
  return knex.schema.createTable('work_status', tbl => {
    tbl.increments();
    tbl.string('work_status').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('work_status');
};
