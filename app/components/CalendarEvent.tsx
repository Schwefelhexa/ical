import { useContext } from "react";
import { calendarContext } from "./Calendar";
import { DAY_IN_MS, dateFromWeek } from "~/utils/date";
import { classNames } from "~/utils/classNames";

export type CalendarEventProps = {
  from: Date;
  to: Date;
  title: string;
  location?: string;
  ghost?: boolean;
};
export default function CalendarEvent({
  from,
  to,
  title,
  location,
  ghost = false,
}: CalendarEventProps) {
  const context = useContext(calendarContext);
  if (!context) throw new Error("CalendarEvent must be used within a Calendar");

  const weekStart = dateFromWeek(context.week, context.year);
  const dayIndex = Math.floor(
    (from.getTime() - weekStart.getTime()) / DAY_IN_MS,
  );

  const startHour = from.getHours() + from.getMinutes() / 60;
  const duration = ((to.getTime() - from.getTime()) / DAY_IN_MS) * 24;

  return (
    <li
      className="relative mt-px flex sm:col-start-[--col]"
      style={
        {
          gridRow: `${
            context.slot_offset +
            startHour * context.slots_per_hour -
            context.range[0] * context.slots_per_hour
          } / span ${duration * context.slots_per_hour}`,
          "--col": dayIndex + 1,
        } as React.CSSProperties
      }
    >
      <div
        className={classNames(
          "group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 ",
          !ghost && "bg-pink-50 hover:bg-pink-100",
          ghost && "border border-dashed border-pink-200 bg-white hover:bg-gray-100 hover:border-dashed-600",
        )}
      >
        <p className="text-pink-500 group-hover:text-pink-700">
          <time dateTime={from.toISOString()}>
            {from.toLocaleString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </p>
        <p className="font-semibold text-pink-700">{title}</p>
        {location && <p className="text-pink-600">{location}</p>}
      </div>
    </li>
  );
}
