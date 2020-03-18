exports.up = function(knex, Promise) {
  return knex.schema.createTable('company_reviews', tbl => {
    tbl.increments();
    tbl.string('job_title').notNullable();
    tbl.integer('start_date');
    tbl.integer('end_date');
    tbl.string('comment', 1200);
    tbl.integer('typical_hours');
    tbl.integer('salary');
    tbl.integer('job_rating');
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
    tbl
      .integer('work_status_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('work_status')
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
  return knex.schema.dropTableIfExists('company_reviews');
};
