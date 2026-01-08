import { Sidebar } from '@/components/admin/sidebar'
import { Topbar } from '@/components/admin/topbar'
import { MobileNav } from '@/components/admin/mobile-nav'

import { ADMIN_STYLES } from '@/lib/admin-styles'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`flex h-screen overflow-hidden flex-col md:flex-row ${ADMIN_STYLES.SHELL_BG} ${ADMIN_STYLES.SHELL_TEXT}`}>
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
        <MobileNav />
        <span className="font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</span>
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
