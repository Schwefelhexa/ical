import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { weekOfYear } from "~/utils/date";
import type { CalendarProps } from "~/components/Calendar";
import Calendar from "~/components/Calendar";

export const meta: MetaFunction = () => {
  return [
    { title: "Calendar View" },
    { name: "description", content: "Edit & preview filter changes" },
  ];
};

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

  return <Calendar year={year} week={week} onWeekChange={changeWeek} />;
}
