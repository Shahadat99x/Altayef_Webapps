import { ADMIN_STYLES } from '@/lib/admin-styles'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={ADMIN_STYLES.H1}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Placeholders */}
        <div className={ADMIN_STYLES.CARD}>
          <h3 className={ADMIN_STYLES.TEXT_MUTED + " text-sm font-medium"}>Total Enquiries</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className={ADMIN_STYLES.CARD}>
          <h3 className={ADMIN_STYLES.TEXT_MUTED + " text-sm font-medium"}>Active Services</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className={ADMIN_STYLES.CARD}>
          <h3 className={ADMIN_STYLES.TEXT_MUTED + " text-sm font-medium"}>Articles</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
      <div className={`mt-8 ${ADMIN_STYLES.CARD}`}>
        <h3 className={ADMIN_STYLES.H3 + " mb-4"}>Recent Activity</h3>
        <p className={ADMIN_STYLES.TEXT_MUTED}>No activity yet.</p>
      </div>
    </div>
  )
}
