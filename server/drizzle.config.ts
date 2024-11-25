import { defineConfig } from "drizzle-kit";
// export default defineConfig({
//   out: './drizzle',
//   schema: './src/db/schema.ts',
//   driver: "mysql2",
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//   },
// });

export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect:"mysql",
    host: 'mysql',
    database: 'mydb',
    dbCredentials: {
      uri: "mysql://root:111111@mysql:3306/mydb",
    }
  } 