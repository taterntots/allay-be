exports.up = function (knex) {
  return knex.schema.table('reviews', tbl => {
    tbl.string('tagline', 120)
      .notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.table('reviews', function(tbl) {
    tbl.dropColumn('tagline');
  })
};