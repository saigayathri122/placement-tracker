import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (

    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}

      <div className="p-6 border-b border-zinc-800">
        <Navbar />
      </div>

      {/* HERO SECTION */}

      <section className="flex flex-col items-center justify-center text-center mt-32 px-6">

        <h2 className="text-6xl font-bold max-w-4xl leading-tight">
          Track Your Placement Journey Easily
        </h2>

        <p className="text-zinc-400 mt-6 max-w-2xl text-lg">
          Organize applications, interviews,
          offers, and deadlines in one place.
        </p>

        <div className="mt-10 flex gap-4">

          <Link href="/add">

            <button className="
              bg-white
              text-black
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:scale-105
              transition
            ">
              Add Application
            </button>

          </Link>

          <Link href="/dashboard">

            <button className="
              border
              border-zinc-700
              px-6
              py-3
              rounded-xl
              hover:bg-zinc-900
              transition
            ">
              View Dashboard
            </button>

          </Link>

        </div>

      </section>

    </main>
  );
}