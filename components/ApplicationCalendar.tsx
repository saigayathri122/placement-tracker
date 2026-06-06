"use client";

import { useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Application {
  id: string;
  company_name: string;
  role: string;
  status: string;
  event_date: string;
}

interface Props {
  applications: Application[];
}

export default function ApplicationCalendar({ applications }: Props) {
  
  // ✅ Convert DB data into calendar-friendly map
  const eventsMap = useMemo(() => {
    const map: Record<string, Application[]> = {};

    applications.forEach((app) => {
      if (!app.event_date) return;

      const dateKey = app.event_date.split("T")[0]; // normalize YYYY-MM-DD

      if (!map[dateKey]) {
        map[dateKey] = [];
      }

      map[dateKey].push(app);
    });

    return map;
  }, [applications]);

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-10">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">
        Events Calendar
      </h2>

      {/* CALENDAR */}
      <Calendar
        tileContent={({ date }) => {
          const key = date.toISOString().split("T")[0];

          const events = eventsMap[key];

          if (!events || events.length === 0) return null;

          return (
            <div className="mt-1">
              <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
            </div>
          );
        }}
      />

      {/* EVENT LIST BELOW CALENDAR */}
      <div className="mt-6 space-y-3">
        {applications
          .filter((app) => app.event_date)
          .sort(
            (a, b) =>
              new Date(a.event_date).getTime() -
              new Date(b.event_date).getTime()
          )
          .map((app) => (
            <div
              key={app.id}
              className="bg-black p-4 rounded-xl border border-zinc-800"
            >
              <p className="font-semibold">
                {app.company_name}
              </p>

              <p className="text-zinc-400 text-sm">
                {app.role}
              </p>

              <p className="text-sm mt-1 text-white/70">
                {app.status}
              </p>

              <p className="text-xs mt-1 text-zinc-500">
                📅 {app.event_date}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}