import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { weekOfYear } from "~/utils/date";
import type { CalendarProps } from "~/components/Calendar";
import Calendar from "~/components/Calendar";
import CalendarEvent from "~/components/CalendarEvent";
import FilterList from "~/components/FilterList";
import db from "~/db";
import { filters } from "~/db/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Calendar View" },
    { name: "description", content: "Edit & preview filter changes" },
  ];
};

export const loader = async () => {
  return json({
    filters: db.select().from(filters).all(),
  });
};

const meetings = [
  {
    title: "Mathematics Lecture",
    location: "Math Building, Room 101",
    from: new Date(2023, 10, 6, 9),
    to: new Date(2023, 10, 6, 10),
  },
  {
    title: "Study Group with Friends",
    location: "Library, Study Room 3",
    from: new Date(2023, 10, 6, 14),
    to: new Date(2023, 10, 6, 16),
  },
  {
    title: "Physics Lab",
    location: "Science Building, Lab 204",
    from: new Date(2023, 10, 7, 11),
    to: new Date(2023, 10, 7, 13),
  },
  {
    title: "Student Club Meeting",
    location: "Student Center, Meeting Room",
    from: new Date(2023, 10, 7, 15),
    to: new Date(2023, 10, 7, 17),
  },
  {
    title: "English Literature Seminar",
    location: "Humanities Building, Room 301",
    from: new Date(2023, 10, 8, 13),
    to: new Date(2023, 10, 8, 14),
  },
  {
    title: "Career Counseling Session",
    location: "Student Services Center, Office 2A",
    from: new Date(2023, 10, 8, 16),
    to: new Date(2023, 10, 8, 17),
  },
  {
    title: "Chemistry Lecture",
    location: "Science Building, Lecture Hall",
    from: new Date(2023, 10, 9, 10),
    to: new Date(2023, 10, 9, 11),
  },
  {
    title: "Student Senate Meeting",
    location: "Student Center, Meeting Room",
    from: new Date(2023, 10, 9, 14),
    to: new Date(2023, 10, 9, 15),
  },
  {
    title: "Biology Lab",
    location: "Science Building, Lab 302",
    from: new Date(2023, 10, 10, 12),
    to: new Date(2023, 10, 10, 14),
  },
  {
    title: "Study Group with Classmates",
    location: "Library, Study Room 5",
    from: new Date(2023, 10, 10, 15),
    to: new Date(2023, 10, 10, 17),
  },
  {
    title: "Psychology Lecture",
    location: "Psychology Building, Room 210",
    from: new Date(2023, 10, 11, 9),
    to: new Date(2023, 10, 11, 10),
  },
  {
    title: "Tutoring Session",
    location: "Tutoring Center, Room 7B",
    from: new Date(2023, 10, 11, 14),
    to: new Date(2023, 10, 11, 16),
  },
  {
    title: "Private Morning Meditation",
    from: new Date(2023, 10, 12, 7),
    to: new Date(2023, 10, 12, 8),
  },
  {
    title: "Private Evening Reading",
    from: new Date(2023, 10, 12, 18),
    to: new Date(2023, 10, 12, 19),
  },
];

export default function Example() {
  const { filters } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const year = parseInt(
    searchParams.get("year") || new Date().getFullYear().toString(),
  );
  const week = parseInt(
    searchParams.get("week") || weekOfYear(new Date()).toString(),
  );

  const changeWeek: CalendarProps["onWeekChange"] = (week) => {
    let value = week === "current" ? "" : week.toString();
    searchParams.set("week", value);
    setSearchParams(searchParams);
  };

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
          Math.min(...meetings.map((m) => m.from.getHours())),
          Math.max(...meetings.map((m) => m.to.getHours())),
        ]}
      >
        {meetings.map((m, i) => (
          <CalendarEvent
            key={i}
            title={m.title}
            from={m.from}
            to={m.to}
            location={m.location}
          />
        ))}
      </Calendar>
      <div className="border-l border-gray-300 px-4 pt-2">
        <FilterList filters={filters} onFilterChange={() => {}} />
      </div>
    </div>
  );
}
