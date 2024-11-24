export async function up(knex) {
    await knex.schema.createTable('permissions_users', (table) => {
      table.string('id', 36).primary();
      table.boolean('create').defaultTo(false);
      table.boolean('read').defaultTo(true);
      table.boolean('update').defaultTo(false);
      table.boolean('delete').defaultTo(false);
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTableIfExists('permissions_users');
  }
  