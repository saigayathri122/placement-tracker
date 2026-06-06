"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Application {
  id: string;
  company_name: string;
  role: string;
  status: string;
  notes: string;
  event_date: string;
}

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  // editable state
  const [form, setForm] = useState({
    company_name: "",
    role: "",
    status: "",
    notes: "",
    event_date: "",
  });

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setEvent(data);
        setForm({
          company_name: data.company_name || "",
          role: data.role || "",
          status: data.status || "",
          notes: data.notes || "",
          event_date: data.event_date || "",
        });
      }

      setLoading(false);
    }

    if (id) fetchEvent();
  }, [id]);

  async function saveChanges() {
    const { error } = await supabase
      .from("applications")
      .update({
        company_name: form.company_name,
        role: form.role,
        status: form.status,
        notes: form.notes,
        event_date: form.event_date,
      })
      .eq("id", id);

    if (!error) {
      setEditMode(false);

      // refresh local state
      setEvent((prev) => (prev ? { ...prev, ...form } : prev));
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Event not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <Navbar />

      {/* BACK + EDIT BUTTONS */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-zinc-400 hover:text-white"
        >
          ← Back
        </button>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700"
          >
            ✏️ Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(false)}
              className="bg-zinc-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={saveChanges}
              className="bg-green-600 px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* CARD */}
      <div className="max-w-2xl bg-zinc-900 p-8 rounded-2xl space-y-5">

        {/* COMPANY */}
        <div>
          <p className="text-zinc-400 text-sm">Company</p>

          {editMode ? (
            <input
              className="w-full bg-black p-2 rounded mt-1"
              value={form.company_name}
              onChange={(e) =>
                setForm({ ...form, company_name: e.target.value })
              }
            />
          ) : (
            <p className="text-lg">{event.company_name}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <p className="text-zinc-400 text-sm">Role</p>

          {editMode ? (
            <input
              className="w-full bg-black p-2 rounded mt-1"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            />
          ) : (
            <p className="text-lg">{event.role}</p>
          )}
        </div>

        {/* STATUS */}
        <div>
          <p className="text-zinc-400 text-sm">Status</p>

          {editMode ? (
            <select
              className="w-full bg-black p-2 rounded mt-1"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Applied</option>
              <option>OA Scheduled</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>
          ) : (
            <p className="text-lg">{event.status}</p>
          )}
        </div>

        {/* DATE */}
        <div>
          <p className="text-zinc-400 text-sm">Date</p>

          {editMode ? (
            <input
              type="date"
              className="w-full bg-black p-2 rounded mt-1"
              value={form.event_date?.split("T")[0]}
              onChange={(e) =>
                setForm({ ...form, event_date: e.target.value })
              }
            />
          ) : (
            <p className="text-lg">
              {event.event_date?.split("T")[0]}
            </p>
          )}
        </div>

        {/* NOTES */}
        <div>
          <p className="text-zinc-400 text-sm">Notes</p>

          {editMode ? (
            <textarea
              className="w-full bg-black p-2 rounded mt-1"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />
          ) : (
            <p className="text-lg">{event.notes}</p>
          )}
        </div>
      </div>
    </main>
  );
}