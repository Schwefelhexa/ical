import { useContext } from "react";
import { calendarContext } from "./Calendar";
import { DAY_IN_MS, dateFromWeek } from "~/utils/date";

export type CalendarEventProps = {
  from: Date;
  to: Date;
  title: string;
};
export default function CalendarEvent({ from, to, title }: CalendarEventProps) {
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
            context.slot_offset + startHour * context.slots_per_hour
          } / span ${duration * context.slots_per_hour}`,
          "--col": dayIndex + 1,
        } as React.CSSProperties
      }
    >
      <div className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
        <p className="order-1 font-semibold text-pink-700">{title}</p>
        <p className="text-pink-500 group-hover:text-pink-700">
          <time dateTime={from.toISOString()}>
            {from.toLocaleString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </p>
      </div>
    </li>
  );
}
