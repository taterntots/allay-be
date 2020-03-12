exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', tbl => {
    tbl.increments();
    tbl
      .string('company_name')
      .notNullable()
      .unique();
    tbl.string('hq_city').notNullable();
    tbl.string('hq_state');
    tbl.string('domain');
    tbl.string('industry_name');
    tbl.string('size_range');
    tbl.string('linkedin_url');
    tbl
      .integer('state_id')
      .unsigned()
      .references('id')
      .inTable('states')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('companies');
};
