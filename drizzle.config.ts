import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: 'mysql',
    user: 'admin',
    password: 'admin',
    port: 3306,
    database: 'nest_app',
  },
});
