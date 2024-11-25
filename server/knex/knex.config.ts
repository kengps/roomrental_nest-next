import Knex, { Knex as KnexType } from 'knex';

// Configuration settings for Knex
const knexConfig: { [key: string]: KnexType.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'mysql', // หรือ 'localhost' หากไม่ได้ใช้ Docker
      user: 'root',
      password: '111111',
      database: 'mydb',
    },
    migrations: {
      directory: './migrations', // Path สำหรับเก็บ migration files
    },
    seeds: {
      directory: './seeds', // Path สำหรับเก็บ seed files
    },
  },
};

// Create Knex instance based on configuration
export const knexInstance = Knex(knexConfig.development);

// Export knex instance for use in the application
 
