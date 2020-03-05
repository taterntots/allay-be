exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('email', 128)
      .notNullable()
      .unique();
    tbl.string('password', 128)
      .notNullable();
    tbl.string('username', 128)
      .notNullable()
      .unique();
  })
    .createTable('companies', tbl => {
      tbl.increments();
      tbl.string('name', 128)
        .notNullable()
        .unique();
      tbl.string('hq_state', 128);
      tbl.string('hq_city', 128);
      tbl.string('domain');
      tbl.string('industry_name');
      tbl.string('size_range');
      tbl.string('linkedin_url');
    })
    .createTable('reviews', tbl => {
      tbl.increments();
      tbl.string('job_title', 128)
        .notNullable();
      tbl.string('job_location', 128)
        .notNullable();
      tbl.integer('salary')
        .notNullable();
      tbl.string('interview_review', 1200); //changing name
      tbl.integer('interview_rating');
      tbl.string('job_review', 1200); //changing name
      tbl.integer('job_rating'); //changing name
      tbl.string('tagline', 120)
        .notNullable();
      tbl.boolean('offer_received')
        .defaultTo(false);
      tbl.boolean('offer_accepted')
        .defaultTo(false);
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('company_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews')
    .dropTableIfExists('companies')
    .dropTableIfExists('users')
};