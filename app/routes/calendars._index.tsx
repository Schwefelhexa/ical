import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import db from "~/db";

export async function loader() {
  const calendars = (await db.query.calendars.findMany()).map((c) => ({
    ...c,
    iconUrl: `/api/favicon?url=${encodeURI("https://" + c.sourceUrl)}`,
  }));

  const c = calendars[0];
  console.log(new URL("https://" + c.sourceUrl).hostname);

  return json({ calendars });
}

export default function Calendars() {
  const { calendars } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="max-w-4xl overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ul className="divide-y divide-gray-100">
            {calendars.map((calendar) => (
              <li key={calendar.id}>
                <Link
                  to={`/calendars/${calendar.id}`}
                  className="flex items-center gap-x-4 py-5 px-2 rounded hover:bg-gray-100"
                >
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={calendar.iconUrl}
                    alt="Favicon for"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {calendar.name}
                    </p>
                    <p className="mt-1 max-w-[40ch] truncate text-xs leading-5 text-gray-500">
                      {calendar.sourceUrl}
                    </p>
                  </div>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-none text-gray-400 ml-16"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
