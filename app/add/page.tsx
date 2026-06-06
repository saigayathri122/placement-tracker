"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function AddApplication() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [eventDate, setEventDate] = useState(""); // ✅ NEW STATE

  const router = useRouter();

  // PROTECTED ROUTE
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      }
    }

    checkUser();
  }, []);

  // SUBMIT FUNCTION
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase.from("applications").insert([
      {
        company_name: company,
        role,
        status,
        notes,
        event_date: eventDate, // ✅ SAVED TO DB
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Application saved!");

      // RESET FORM
      setCompany("");
      setRole("");
      setStatus("Applied");
      setNotes("");
      setEventDate(""); // ✅ RESET DATE

      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {/* NAVBAR */}
      <Navbar />

      {/* HEADING */}
      <h1 className="text-4xl font-bold mb-10">
        Add Application
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">

        {/* COMPANY */}
        <div>
          <label className="block mb-2 text-zinc-400">
            Company Name
          </label>

          <input
            type="text"
            placeholder="Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 focus:border-white"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block mb-2 text-zinc-400">
            Role
          </label>

          <input
            type="text"
            placeholder="Software Engineer Intern"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 focus:border-white"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block mb-2 text-zinc-400">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 focus:border-white"
          >
            <option value="Applied">Applied</option>
            <option value="OA Scheduled">OA Scheduled</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        {/* EVENT DATE ✅ NEW FIELD */}
        <div>
          <label className="block mb-2 text-zinc-400">
            Event Date
          </label>

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 focus:border-white"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="block mb-2 text-zinc-400">
            Notes
          </label>

          <textarea
            placeholder="Need to revise DSA"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 focus:border-white h-32"
          />
        </div>

        {/* BUTTON */}
        <button
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Save Application
        </button>
      </form>
    </main>
  );
}