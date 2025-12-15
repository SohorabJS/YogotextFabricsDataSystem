import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="w-full bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
          <h1 className="text-xl font-bold">Yogotext Fabrics Co. Ltd.</h1>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Login</button>
      </header>

      {/* Content Layout */}
      <div className="flex">
        {/* Sidebar Menu */}
        <aside className="w-64 bg-white shadow h-screen p-5 space-y-4">
          <ul className="space-y-3 text-lg font-semibold">
            <li>Home</li>
            <li>Sample Data</li>
            <li>Regular Production Data</li>
            <li>Machine Tools Update News</li>
            <li>Employee</li>
            <li>About</li>
          </ul>
        </aside>

        {/* Home Images Section */}
        <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-4">
            <div className="w-full h-40 bg-gray-300 rounded"></div>
            <h2 className="mt-3 font-semibold text-lg">Fabrics Machine</h2>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="w-full h-40 bg-gray-300 rounded"></div>
            <h2 className="mt-3 font-semibold text-lg">Yarns</h2>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="w-full h-40 bg-gray-300 rounded"></div>
            <h2 className="mt-3 font-semibold text-lg">Fabrics Style</h2>
          </div>
        </main>
      </div>
    </div>
  );
}
