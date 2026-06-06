import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      <nav className="flex items-center justify-between p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold">
          Placement Tracker
        </h1>

        <div className="space-x-4">
          <Link href="/dashboard">
            <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center mt-32 px-6">
        
        <h2 className="text-6xl font-bold max-w-4xl leading-tight">
          Track Your Placement Journey Easily
        </h2>

        <p className="text-zinc-400 mt-6 max-w-2xl text-lg">
          Organize applications, interviews, offers, and deadlines in one place.
        </p>

        <div className="mt-10 flex gap-4">
          
          <Link href="/add">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
              Add Application
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="border border-zinc-700 px-6 py-3 rounded-xl">
              View Dashboard
            </button>
          </Link>

        </div>

      </section>

    </main>
  );
}