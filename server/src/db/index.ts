import { drizzle } from 'drizzle-orm/mysql2'; // สำหรับ MySQL

import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core';

import * as mysql from 'mysql2/promise';
import { Module } from '@nestjs/common';

// Create MySQL connection pool
const connection = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: '111111',
  database: 'mydb',
});

// Pass connection pool to drizzle ORM
// สร้าง drizzle ORM
export const db = drizzle(connection);
