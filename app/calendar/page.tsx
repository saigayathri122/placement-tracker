"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

type Application = {
  id: string;
  company_name: string;
  role: string;
  status: string;
  event_date: string;
};

export default function CalendarPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const router = useRouter();

  // FETCH DATA
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("applications").select("*");
      setApplications(data || []);
    }

    fetchData();
  }, []);

  // GROUP EVENTS BY DATE
  const eventsMap = useMemo(() => {
    const map: Record<string, Application[]> = {};

    applications.forEach((app) => {
      if (!app.event_date) return;

      const key = app.event_date.split("T")[0];
      if (!map[key]) map[key] = [];

      map[key].push(app);
    });

    return map;
  }, [applications]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Navbar />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Calendar</h1>

        <div className="flex gap-3">
          <button
            onClick={prevMonth}
            className="px-4 py-2 bg-zinc-900 rounded-xl"
          >
            ←
          </button>

          <div className="px-6 py-2 bg-zinc-900 rounded-xl">
            {monthName} {year}
          </div>

          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-zinc-900 rounded-xl"
          >
            →
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2">

        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="text-center text-zinc-400 mb-2">
            {d}
          </div>
        ))}

        {days.map((day, idx) => {
          if (!day) {
            return (
              <div key={idx} className="h-28 bg-zinc-950 rounded-xl" />
            );
          }

          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const events = eventsMap[dateKey] || [];

          return (
            <div
              key={idx}
              className="h-28 bg-zinc-900 rounded-xl p-2 overflow-hidden hover:bg-zinc-800"
            >
              <div className="text-sm text-zinc-400">{day}</div>

              <div className="mt-1 space-y-1">
                {events.slice(0, 2).map((event) => (
                  <button
                    key={event.id}
                    onClick={() => router.push(`/events/${event.id}`)}
                    className="text-xs bg-black px-2 py-1 rounded-md truncate w-full text-left hover:bg-zinc-800"
                  >
                    {event.company_name} • {event.status}
                  </button>
                ))}

                {events.length > 2 && (
                  <div className="text-xs text-zinc-400">
                    +{events.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}