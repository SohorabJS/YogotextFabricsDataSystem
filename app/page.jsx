export default function HomePage() {
  return (
    <section className="py-16">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to Yogotext Fabrics Data System</h2>
        <p className="text-gray-600 mb-6">Manage fabric sample data, users and production information.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Samples</h3>
            <p className="text-sm text-gray-500">View and manage sample entries.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Production</h3>
            <p className="text-sm text-gray-500">Track regular production data.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Users</h3>
            <p className="text-sm text-gray-500">Register and manage user accounts.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
