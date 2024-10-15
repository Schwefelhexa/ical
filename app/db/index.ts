import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const sqlite = process.env.TURSO_CONNECTION_URL ? createClient({
	url: process.env.TURSO_CONNECTION_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!,
}) : new Database(process.env.DATABASE_PATH ?? "sqlite.db");

const db = drizzle(sqlite, { schema });
migrate(db, { migrationsFolder: "./drizzle" });

export default db;
