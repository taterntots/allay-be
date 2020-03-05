exports.up = function (knex) {
  return knex.schema.table('companies', tbl => {
    tbl.text('domain');
    tbl.text('industry_name');
    tbl.text('size_range');
    tbl.text('linkedin_url');
  })
};

exports.down = function (knex) {
  return knex.schema.table('companies', function (tbl) {
    tbl.dropColumn('domain')
      .dropColumn('industry_name')
      .dropColumn('size_range')
      .dropColumn('linkedin_url');
  })
};