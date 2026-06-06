"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSignup() {

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created successfully!");
    }
  }

  async function handleLogin() {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-4 rounded-xl bg-black mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-4 rounded-xl bg-black mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN */}

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black p-4 rounded-xl font-semibold mb-4"
        >
          Login
        </button>

        {/* SIGNUP */}

        <button
          onClick={handleSignup}
          className="w-full bg-zinc-700 p-4 rounded-xl font-semibold"
        >
          Create Account
        </button>

      </div>

    </main>
  );
}