exports.up = function(knex) {
  return knex.schema.createTable('topic_by_interview', tbl => {
    tbl
      .integer('topic_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('topics')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('topic_description', 1200);
    tbl
      .integer('interview_review_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('interview_reviews')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('type_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('types')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('topic_by_interview');
};
