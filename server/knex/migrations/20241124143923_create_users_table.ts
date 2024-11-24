import type { Knex } from "knex";


export async function up(knex) {
    await knex.schema.createTable('users', (table) => {
      table.string('id', 36).primary(); // UUID
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('roleId').notNullable(); // Foreign key
      table.string('permissionsId').notNullable(); // Foreign key
      table.boolean('isActive').defaultTo(true);
      table.string('parentRoleId', 36).nullable(); // เชื่อมโยงไปยัง Profile เอง
      table.timestamps(true, true); // createdAt และ updatedAt
    });
  
    // เพิ่ม Foreign Key
    await knex.schema.table('profiles', (table) => {
      table.foreign('roleId').references('id').inTable('roles').onDelete('CASCADE');
      table.foreign('permissionsId').references('id').inTable('permissions').onDelete('CASCADE');
      table.foreign('parentRoleId').references('id').inTable('users').onDelete('SET NULL');
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTableIfExists('users');
  }
  