const applications = [
  {
    company: "Google",
    role: "SWE Intern",
    status: "Interview",
  },
  {
    company: "Amazon",
    role: "Frontend Intern",
    status: "Rejected",
  },
  {
    company: "Intuit",
    role: "Full Stack Intern",
    status: "Offer",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">Applications</p>
          <h2 className="text-4xl font-bold mt-2">12</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">Interviews</p>
          <h2 className="text-4xl font-bold mt-2">3</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">Offers</p>
          <h2 className="text-4xl font-bold mt-2">1</h2>
        </div>

      </div>

      <div className="mt-12">
        
        <h2 className="text-2xl font-semibold mb-6">
          Recent Applications
        </h2>

        <div className="space-y-4">
          
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-5 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {app.company}
                </h3>

                <p className="text-zinc-400">
                  {app.role}
                </p>
              </div>

              <span className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium">
                {app.status}
              </span>
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}