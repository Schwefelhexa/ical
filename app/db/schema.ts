import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const filters = sqliteTable("filters", {
  id: text("id").primaryKey(),
  filterBy: text("filter_by").notNull(),
  filterValue: text("filter_value").notNull(),
});
export type Filter = typeof filters.$inferSelect;
export type FilterInsert = typeof filters.$inferInsert;
