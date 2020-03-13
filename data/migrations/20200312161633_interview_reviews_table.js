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
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('companies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('job_title').notNullable();
    tbl.string('interview_rounds');
    tbl.string('overall_rating');
    tbl.string('difficulty_rating');
    tbl.integer('salary');
    tbl
      .integer('offer_status_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('offer_status')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('city');
    tbl
      .integer('state_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('states')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    tbl.timestamp('updated_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('interview_reviews');
};
