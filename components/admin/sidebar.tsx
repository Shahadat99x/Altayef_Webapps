import Link from 'next/link'
// We can use Lucide icons later, keeping it text/simple for now
// import { ... } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Pages', href: '/admin/pages' },
  { name: 'Services', href: '/admin/services' },
  { name: 'Countries', href: '/admin/countries' },
  { name: 'Verify License', href: '/admin/verify-license' },
  { name: 'Articles', href: '/admin/articles' },
  { name: 'Team', href: '/admin/team' },
  { name: 'Testimonials', href: '/admin/testimonials' },
  { name: 'Enquiries', href: '/admin/enquiries' },
  { name: 'Settings', href: '/admin/settings' },
]

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-800">
        Altayef Admin
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <form
          action={async () => {
            'use server'
            const { signOut } = await import('@/auth')
            await signOut()
          }}
        >
          <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded text-red-400">
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
