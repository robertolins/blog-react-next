import { drizzle } from 'drizzle-orm/libsql/node';
import { postsTable } from './schemas';
import { resolve } from 'path';
import { createClient } from '@libsql/client';

const sqliteDatabasePath = resolve(process.cwd(), 'db.sqlite3');
const sqliteDatabase = createClient({
  url: `file:${sqliteDatabasePath}`,
});

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});
