export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Placeholder */}
      <header className="py-6 px-4 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">Altayef</div>
          <nav className="space-x-4">
            <span className="text-gray-500 cursor-not-allowed">Home</span>
            <span className="text-gray-500 cursor-not-allowed">Services</span>
            <span className="text-gray-500 cursor-not-allowed">Contact</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gray-50">
          <div className="container mx-auto max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Simplifying Your Visa Processing
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Government-approved agency in Dhaka, providing reliable and fast
              visa solutions.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
                disabled
              >
                Get Started
              </button>
              <button
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition disabled:opacity-50"
                disabled
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Placeholder */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 border rounded-lg bg-gray-50">
                  <div className="h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Placeholder */}
      <footer className="py-8 px-4 border-t border-gray-200 bg-white text-center text-gray-500">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Altayef Webapps. All rights
          reserved.
        </div>
      </footer>
    </div>
  )
}
