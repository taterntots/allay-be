exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl
      .string('email', 128)
      .notNullable()
      .unique();
    tbl.string('password');
    tbl
      .string('track_name')
      .unsigned()
      .notNullable()
      .references('track_name')
      .inTable('tracks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
