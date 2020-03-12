exports.up = function(knex) {
  return knex.schema.createTable('tracks', tbl => {
    tbl.increments();
    tbl.string('track_name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tracks');
};
