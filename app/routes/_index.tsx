import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { weekOfYear } from "~/utils/date";
import type { CalendarProps } from "~/components/Calendar";
import Calendar from "~/components/Calendar";
import CalendarEvent from "~/components/CalendarEvent";

export const meta: MetaFunction = () => {
  return [
    { title: "Calendar View" },
    { name: "description", content: "Edit & preview filter changes" },
  ];
};

const meetings = [
  {
    title: "Mathematics Lecture",
    from: new Date(2023, 10, 6, 9),
    to: new Date(2023, 10, 6, 10),
  },
  {
    title: "Study Group with Friends",
    from: new Date(2023, 10, 6, 14),
    to: new Date(2023, 10, 6, 16),
  },
  {
    title: "Physics Lab",
    from: new Date(2023, 10, 7, 11),
    to: new Date(2023, 10, 7, 13),
  },
  {
    title: "Student Club Meeting",
    from: new Date(2023, 10, 7, 15),
    to: new Date(2023, 10, 7, 17),
  },
  {
    title: "English Literature Seminar",
    from: new Date(2023, 10, 8, 13),
    to: new Date(2023, 10, 8, 14),
  },
  {
    title: "Career Counseling Session",
    from: new Date(2023, 10, 8, 16),
    to: new Date(2023, 10, 8, 17),
  },
  {
    title: "Chemistry Lecture",
    from: new Date(2023, 10, 9, 10),
    to: new Date(2023, 10, 9, 11),
  },
  {
    title: "Student Senate Meeting",
    from: new Date(2023, 10, 9, 14),
    to: new Date(2023, 10, 9, 15),
  },
  {
    title: "Biology Lab",
    from: new Date(2023, 10, 10, 12),
    to: new Date(2023, 10, 10, 14),
  },
  {
    title: "Study Group with Classmates",
    from: new Date(2023, 10, 10, 15),
    to: new Date(2023, 10, 10, 17),
  },
  {
    title: "Psychology Lecture",
    from: new Date(2023, 10, 11, 9),
    to: new Date(2023, 10, 11, 10),
  },
  {
    title: "Tutoring Session",
    from: new Date(2023, 10, 11, 14),
    to: new Date(2023, 10, 11, 16),
  },
  {
    title: "Art History Seminar",
    from: new Date(2023, 10, 12, 11),
    to: new Date(2023, 10, 12, 12),
  },
  {
    title: "Computer Science Workshop",
    from: new Date(2023, 10, 12, 15),
    to: new Date(2023, 10, 12, 17),
  },
];

export default function Example() {
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
    <Calendar year={year} week={week} onWeekChange={changeWeek}>
      {meetings.map((m, i) => (
        <CalendarEvent key={i} title={m.title} from={m.from} to={m.to} />
      ))}
    </Calendar>
  );
}
