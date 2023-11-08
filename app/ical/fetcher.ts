import type { Calendar } from "~/db/schema";
import ical from "@nponsard/ical";
import type { CalendarEvent } from "./filter";

export async function fetchEvents(calendar: Calendar) {
  const response = await fetch("https://" + calendar.sourceUrl);
  const text = await response.text();
  const data = await ical.async.parseICS(text);

  const events = Object.values(data).filter(
    (event) => event.type === "VEVENT",
  ) as unknown as CalendarEvent[];

  return events;
}
