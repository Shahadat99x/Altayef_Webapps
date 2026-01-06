import { Sidebar } from '@/components/admin/sidebar'
import { Topbar } from '@/components/admin/topbar'
import { MobileNav } from '@/components/admin/mobile-nav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden flex-col md:flex-row">
      <div className="md:hidden bg-white border-b flex items-center justify-between px-4">
        <MobileNav />
        <span className="font-bold text-gray-700">Admin Dashboard</span>
      </div>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="hidden md:block">
          <Topbar />
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
