export default function AddApplication() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      
      <h1 className="text-4xl font-bold mb-10">
        Add Application
      </h1>

      <form className="max-w-2xl space-y-6">

        <div>
          <label className="block mb-2 text-zinc-400">
            Company Name
          </label>

          <input
            type="text"
            placeholder="Google"
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-zinc-400">
            Role
          </label>

          <input
            type="text"
            placeholder="Software Engineer Intern"
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-zinc-400">
            Status
          </label>

          <select className="w-full bg-zinc-900 p-4 rounded-xl outline-none">
            <option>Applied</option>
            <option>OA Scheduled</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-zinc-400">
            Notes
          </label>

          <textarea
            placeholder="Need to revise DSA"
            className="w-full bg-zinc-900 p-4 rounded-xl outline-none h-32"
          />
        </div>

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
          Save Application
        </button>

      </form>

    </main>
  );
}