exports.up = function (knex) {
  return knex.schema.createTable('industries', tbl => {
    tbl.increments();
    tbl.text('name')
      .unique();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('industries');
};