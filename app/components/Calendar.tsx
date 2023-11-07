import type { PropsWithChildren } from "react";
import { Fragment } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "~/utils/classNames";
import { DAY_IN_MS, dateFromWeek, isToday } from "~/utils/date";

const times = [...new Array(24)].map(
  (_, i) => i.toString().padStart(2, "0") + ":00",
);

export type CalendarProps = PropsWithChildren<{
  year: number;
  week: number;
  onWeekChange?: (week: number | "current") => void;
}>;

export default function Calendar({ year, week, children, onWeekChange }: CalendarProps) {
  const startDate = dateFromWeek(week, year);
  const weekDays = [...new Array(7)].map(
    (_, i) => new Date(startDate.getTime() + i * DAY_IN_MS),
  );

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          {startDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              onClick={() => onWeekChange?.(week - 1)}
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => onWeekChange?.("current")}
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              onClick={() => onWeekChange?.(week + 1)}
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => onWeekChange?.("current")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm",
                        )}
                      >
                        Go to today
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {weekDays.map((d) => (
                <button
                  key={d.getTime()}
                  type="button"
                  className="flex flex-col items-center pb-3 pt-2"
                >
                  {d
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .slice(0, 1)}
                  <span
                    className={classNames(
                      "mt-1 flex h-8 w-8 items-center justify-center",
                      isToday(d) && "rounded-full bg-indigo-600 text-white",
                      d.getMonth() === startDate.getMonth()
                        ? "font-semibold text-gray-900"
                        : "text-gray-400",
                    )}
                  >
                    {d.getDate()}
                  </span>
                </button>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {weekDays.map((d) => (
                <div
                  className="flex items-center justify-center py-3"
                  key={d.getTime()}
                >
                  <span
                    className={classNames(isToday(d) && "flex items-baseline")}
                  >
                    {d.toLocaleDateString("en-US", { weekday: "short" }) + " "}
                    <span
                      className={classNames(
                        "items-center justify-center font-semibold",
                        isToday(d) &&
                          "-my-1 ml-1.5 flex h-8 w-8 rounded-full bg-indigo-600 font-semibold text-white",
                        d.getMonth() === startDate.getMonth()
                          ? "text-gray-900"
                          : "text-gray-400",
                      )}
                    >
                      {d.getDate()}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div />
                {times.map((t) => (
                  <Fragment key={t}>
                    <div>
                      <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {t}
                      </div>
                    </div>
                    <div />
                  </Fragment>
                ))}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                {[...new Array(weekDays.length - 1)].map((i) => (
                  <div
                    key={i}
                    className="row-span-full"
                    style={{ gridColumnStart: i }}
                  />
                ))}
                <div className="col-start-8 row-span-full w-8" />
              </div>

							{children}

              {/* Events 
							<ol
								className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
								style={{
									gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
								}}
							>
								<li
									className="relative mt-px flex sm:col-start-3"
									style={{ gridRow: "74 / span 12" }}
								>
									<a
										href="#"
										className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
									>
										<p className="order-1 font-semibold text-blue-700">
											Breakfast
										</p>
										<p className="text-blue-500 group-hover:text-blue-700">
											<time dateTime="2022-01-12T06:00">6:00 AM</time>
										</p>
									</a>
								</li>
								<li
									className="relative mt-px flex sm:col-start-3"
									style={{ gridRow: "92 / span 30" }}
								>
									<a
										href="#"
										className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
									>
										<p className="order-1 font-semibold text-pink-700">
											Flight to Paris
										</p>
										<p className="text-pink-500 group-hover:text-pink-700">
											<time dateTime="2022-01-12T07:30">7:30 AM</time>
										</p>
									</a>
								</li>
								<li
									className="relative mt-px hidden sm:col-start-6 sm:flex"
									style={{ gridRow: "122 / span 24" }}
								>
									<a
										href="#"
										className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
									>
										<p className="order-1 font-semibold text-gray-700">
											Meeting with design team at Disney
										</p>
										<p className="text-gray-500 group-hover:text-gray-700">
											<time dateTime="2022-01-15T10:00">10:00 AM</time>
										</p>
									</a>
								</li>
							</ol>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
