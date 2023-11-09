import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

const sqlite = new Database(process.env.DATABASE_PATH ?? "sqlite.db");

const db = drizzle(sqlite, { schema });
migrate(db, { migrationsFolder: "./drizzle" });

export default db;
