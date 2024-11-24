export async function up(knex) {
    await knex.schema.createTable('roles_users', (table) => {
      table.string('id', 36).primary();
      table.enum('name', ['Master', 'Admin', 'Member']).notNullable();
      table.timestamps(true, true); // createdAt และ updatedAt
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTableIfExists('roles_users');
  }
  