"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
    }

    checkUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex justify-between items-center mb-10">
      
      {/* LOGO */}
      <Link href="/">
        <h1 className="
          text-2xl
          font-bold
          cursor-pointer
          hover:text-zinc-300
          transition
        ">
          Placement Tracker
        </h1>
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* DASHBOARD */}
        <Link
          href="/dashboard"
          className="
            bg-zinc-900
            px-5
            py-2
            rounded-xl
            hover:bg-zinc-800
            transition
          "
        >
          Dashboard
        </Link>

        {/* CALENDAR (NEW) */}
        <Link
          href="/calendar"
          className="
            bg-zinc-900
            px-5
            py-2
            rounded-xl
            hover:bg-zinc-800
            transition
          "
        >
          Calendar
        </Link>

        {/* ADD */}
        <Link
          href="/add"
          className="
            bg-zinc-900
            px-5
            py-2
            rounded-xl
            hover:bg-zinc-800
            transition
          "
        >
          Add
        </Link>

        {/* CONDITIONAL AUTH BUTTON */}
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="
              bg-red-500
              px-5
              py-2
              rounded-xl
              hover:opacity-80
              transition
            "
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="
              bg-white
              text-black
              px-5
              py-2
              rounded-xl
              font-semibold
            "
          >
            Login
          </Link>
        )}

      </div>
    </nav>
  );
}