export function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-medium text-gray-800">Admin Area</h2>
      <div className="flex items-center space-x-4">
        {/* Placeholder for user profile or notifications */}
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </header>
  )
}
