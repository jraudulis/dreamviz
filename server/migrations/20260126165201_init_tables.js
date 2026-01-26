
export async function up(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('hash').notNullable();
      table.integer('images_generated').defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('history', table => {
      table.increments('id').primary();
      table.integer('user_id')
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')
           .notNullable();
      table.text('prompt').notNullable();
      table.text('image').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

export async function down(knex) {
  return knex.schema
    .dropTableIfExists('history')
    .dropTableIfExists('users');
};
