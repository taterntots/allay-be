exports.up = function(knex, Promise) {
  return knex.schema.createTable('interview_reviews', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .string('company_name')
      .unsigned()
      .notNullable()
      .references('company_name')
      .inTable('companies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('job_title').notNullable();
    tbl.integer('interview_rounds');
    tbl.integer('overall_rating');
    tbl.integer('difficulty_rating');
    tbl.integer('salary');
    tbl
      .string('offer_status')
      .unsigned()
      .notNullable()
      .references('offer_status')
      .inTable('offer_status')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('city');
    tbl
      .string('abbreviation')
      .unsigned()
      .notNullable()
      .references('abbreviation')
      .inTable('states')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    tbl
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('interview_reviews');
};
