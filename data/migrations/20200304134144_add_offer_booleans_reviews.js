exports.up = function (knex) {
  return knex.schema.table('reviews', tbl => {
    tbl.boolean('offer_received')
      .defaultTo(false);
    tbl.boolean('offer_accepted')
      .defaultTo(false);
  })
};

exports.down = function (knex) {
  return knex.schema.dropColumn('offer_received')
    .dropColumn('offer_accepted');
};