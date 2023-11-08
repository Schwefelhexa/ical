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
