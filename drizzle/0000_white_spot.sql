CREATE TABLE `calendars` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`source_url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `filters` (
	`id` text PRIMARY KEY NOT NULL,
	`filter_by` text NOT NULL,
	`filter_value` text NOT NULL,
	`calendar_id` text NOT NULL
);
