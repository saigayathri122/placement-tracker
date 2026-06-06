"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Application {
  id: string;
  company_name: string;
  role: string;
  status: string;
  notes: string;
  event_date: string;
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const router = useRouter();

  async function fetchApplications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      setApplications(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  async function deleteApplication(id: string) {
    await supabase.from("applications").delete().eq("id", id);
    fetchApplications();
  }

  async function updateStatus(id: string, newStatus: string) {
    await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);

    fetchApplications();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Navbar />

      <h1 className="text-4xl font-bold">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">Applications</p>
          <h2 className="text-4xl font-bold mt-2">{applications.length}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">Interviews</p>
          <h2 className="text-4xl font-bold mt-2">
            {applications.filter((a) => a.status === "Interview").length}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">Offers</p>
          <h2 className="text-4xl font-bold mt-2">
            {applications.filter((a) => a.status === "Offer").length}
          </h2>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-900 p-4 rounded-xl mt-10 mb-6"
      />

      {/* FILTER */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-zinc-900 p-4 rounded-xl mb-6"
      >
        <option>All</option>
        <option>Applied</option>
        <option>OA Scheduled</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      {/* LIST */}
      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : (
        <div className="space-y-4">
          {applications
            .filter((app) =>
              app.company_name.toLowerCase().includes(search.toLowerCase())
            )
            .filter((app) =>
              filter === "All" ? true : app.status === filter
            )
            .map((app) => (
              <div
                key={app.id}
                onClick={() => router.push(`/events/${app.id}`)}
                className="bg-zinc-900 p-5 rounded-xl flex justify-between items-center cursor-pointer hover:bg-zinc-800 transition"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {app.company_name}
                  </h3>
                  <p className="text-zinc-400">{app.role}</p>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(app.id, e.target.value)
                    }
                    className="bg-white text-black px-4 py-2 rounded-lg"
                  >
                    <option>Applied</option>
                    <option>OA Scheduled</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                    <option>Offer</option>
                  </select>

                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="ml-3 bg-red-500 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </main>
  );
}