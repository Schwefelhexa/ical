import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const filters = sqliteTable("filters", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(12)),
  filterBy: text("filter_by").notNull(),
  filterValue: text("filter_value").notNull(),
});
export type Filter = typeof filters.$inferSelect;
export type FilterInsert = typeof filters.$inferInsert;

export const calendars = sqliteTable("calendars", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(12)),
  name: text("name").notNull(),
  sourceUrl: text("source_url").notNull(),
});
