export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Placeholders */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Enquiries</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Active Services</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Articles</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-bold mb-4">Recent Activity</h3>
        <p className="text-gray-500">No activity yet.</p>
      </div>
    </div>
  )
}
