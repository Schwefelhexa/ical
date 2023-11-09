import {
	type ActionFunctionArgs,
	json,
	type MetaFunction,
	redirect,
	type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, Outlet, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { not, inArray, eq, and } from "drizzle-orm";
import { dateFromWeek, weekOfYear } from "~/utils/date";
import type { CalendarProps } from "~/components/Calendar";
import Calendar from "~/components/Calendar";
import CalendarEvent from "~/components/CalendarEvent";
import FilterList from "~/components/FilterList";
import db from "~/db";
import { calendars, filters } from "~/db/schema";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import type { FilterData } from "~/components/Filter";
import Input from "~/components/Input";
import { multipleFilterEvent, unjsonCalendarEvent } from "~/ical/filter";
import { fetchEvents } from "~/ical/fetcher";

export const meta: MetaFunction = () => {
	return [
		{ title: "Calendar View" },
		{ name: "description", content: "Edit & preview filter changes" },
	];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const calendarId = params.calendarId!
	const searchParams = new URL(request.url).searchParams;
	const year = parseInt(
		searchParams.get("year") || new Date().getFullYear().toString(),
	);
	const week = parseInt(
		searchParams.get("week") || weekOfYear(new Date()).toString(),
	);
	const startTime = dateFromWeek(week, year)
	const endTime = dateFromWeek(week + 1, year)

	const calendar = await db.query.calendars.findFirst({
		where: eq(calendars.id, calendarId),
		with: { filters: true }
	})
	if (!calendar) throw new Response("Calendar not found", { status: 404 })

	const eventsAll = await fetchEvents(calendar);
	const eventsInView = eventsAll.filter((e) => e.start >= startTime && e.start < endTime)

	return json({
		filters: calendar.filters,
		calendar,
		events: eventsInView,
		year,
		week,
	});
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const calendarId = params.calendarId!
	const formData = await request.formData();
	const newFilters: FilterData[] = JSON.parse(formData.get("filters"));

	const ids = newFilters.map((f) => f.id);
	// Apply deletion of filters
	if (ids.length > 0)
		await db.delete(filters).where(and(not(inArray(filters.id, ids)), eq(filters.calendarId, calendarId)));
	else await db.delete(filters).where(eq(filters.calendarId, calendarId));
	// Upsert new filters
	for (const filter of newFilters) {
		await db.insert(filters).values({ ...filter, calendarId }).onConflictDoUpdate({
			target: filters.id,
			set: filter,
		});
	}

	const sourceUrl = formData.get("source_url")?.toString();
	await db.update(calendars).set({ sourceUrl }).where(eq(calendars.id, calendarId));

	const url = new URL(request.url);
	url.searchParams.set("success", "true");
	return redirect(url.toString());
};

export default function CalendarPage() {
	const {
		filters: filtersInitial,
		calendar,
		events: eventsJsonified,
		year,
		week,
	} = useLoaderData<typeof loader>();
	const { eventId: selectedEventId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState(filtersInitial);
	const success = searchParams.get("success") === "true";

	const changeWeek: CalendarProps["onWeekChange"] = (week) => {
		let value = week === "current" ? "" : week.toString();
		searchParams.set("week", value);
		setSearchParams(searchParams);
	};

	const events = eventsJsonified.map((e) => unjsonCalendarEvent(e));
	const eventsFiltered = events.filter((e) =>
		multipleFilterEvent(filters, e),
	);

	// Clear success message after 2 seconds
	useEffect(() => {
		if (!success) return;
		const timeout = setTimeout(() => {
			searchParams.delete("success");
			setSearchParams(searchParams);
		}, 2000);
		return () => clearTimeout(timeout);
	}, [success, searchParams, setSearchParams]);

	return (
		<div
			className="grid h-full"
			style={{ gridTemplateColumns: "2fr minmax(28rem, 1fr)" }}
		>
			<Calendar
				year={year}
				week={week}
				onWeekChange={changeWeek}
				hoursRange={[
					Math.min(...events.map((m) => m.start.getHours())),
					Math.max(...events.map((m) => m.end.getHours())),
				]}
			>
				{events.map((m, i) => (
					<CalendarEvent
						key={i}
						event={m}
						isSelected={m.uid === selectedEventId}
						ghost={!eventsFiltered.includes(m)}
					/>
				))}
			</Calendar>
			<Form method="post" className="border-l border-gray-300 h-full divide-y divide-gray-300">
				<div className="space-y-8 px-4 py-4">
					<Input
						name="source_url"
						label="Source URL"
						addonPre="https://"
						defaultValue={calendar.sourceUrl}
					/>
					<FilterList filters={filters} onFiltersChange={setFilters} />
					<div>
						<input
							type="hidden"
							name="filters"
							value={JSON.stringify(filters)}
						/>
						<Button type="submit" className="w-full" size="lg">
							{success ? "Saved!" : "Save changes"}
						</Button>
					</div>
				</div>
				<div className="px-4 py-4">
					<Outlet />
				</div>
			</Form>
		</div>
	);
}
