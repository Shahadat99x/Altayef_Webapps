import { listServicesAdmin } from '@/lib/data/services'
import { listCountriesAdmin } from '@/lib/data/countries'
import { listArticlesAdmin } from '@/lib/data/articles'
import { listEnquiriesAdmin } from '@/lib/data/enquiries'
import { listTeamMembersAdmin } from '@/lib/data/team'
import { listTestimonialsAdmin } from '@/lib/data/testimonials'
import Link from 'next/link'

export default async function AdminDashboard() {
  // Fetch all counts in parallel
  const [services, countries, articles, enquiries, team, testimonials] = await Promise.all([
    listServicesAdmin({}),
    listCountriesAdmin({}),
    listArticlesAdmin({}),
    listEnquiriesAdmin(),
    listTeamMembersAdmin(),
    listTestimonialsAdmin()
  ])

  // Calculate stats
  const stats = {
    enquiries: {
      total: enquiries.length,
      new: enquiries.filter(e => e.status === 'new').length,
    },
    services: {
      total: services.length,
      published: services.filter(s => s.status === 'published').length,
    },
    countries: {
      total: countries.length,
      published: countries.filter(c => c.status === 'published').length,
    },
    articles: {
      total: articles.length,
      published: articles.filter(a => a.status === 'published').length,
    },
    team: {
      total: team.length,
      published: team.filter(t => t.status === 'published').length,
    },
    testimonials: {
      total: testimonials.length,
      published: testimonials.filter(t => t.status === 'published').length,
    },
  }

  // Get recent enquiries (last 5)
  const recentEnquiries = enquiries.slice(0, 5)

  // Get recent articles (last 3)
  const recentArticles = articles.slice(0, 3)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here&apos;s an overview of your website.</p>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Enquiries"
          value={stats.enquiries.total}
          badge={stats.enquiries.new > 0 ? `${stats.enquiries.new} new` : undefined}
          href="/admin/enquiries"
          color="blue"
        />
        <StatCard
          title="Services"
          value={stats.services.published}
          subtitle={`${stats.services.total} total`}
          href="/admin/services"
          color="emerald"
        />
        <StatCard
          title="Countries"
          value={stats.countries.published}
          subtitle={`${stats.countries.total} total`}
          href="/admin/countries"
          color="amber"
        />
        <StatCard
          title="Articles"
          value={stats.articles.published}
          subtitle={`${stats.articles.total} total`}
          href="/admin/knowledge-center"
          color="purple"
        />
        <StatCard
          title="Team"
          value={stats.team.published}
          subtitle={`${stats.team.total} total`}
          href="/admin/team"
          color="rose"
        />
        <StatCard
          title="Reviews"
          value={stats.testimonials.published}
          subtitle={`${stats.testimonials.total} total`}
          href="/admin/testimonials"
          color="cyan"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="text-slate-500 text-sm py-8 text-center">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enquiry) => (
                <Link
                  key={enquiry._id?.toString()}
                  href={`/admin/enquiries/${enquiry._id?.toString()}`}
                  className="block p-3 rounded-lg bg-slate-900/50 hover:bg-slate-700/50 transition-colors border border-slate-700/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white truncate">{enquiry.fullName}</p>
                      <p className="text-sm text-slate-400 truncate">{enquiry.email}</p>
                    </div>
                    <StatusBadge status={enquiry.status} />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {enquiry.createdAt ? formatRelativeTime(enquiry.createdAt) : 'Unknown date'}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Articles */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Articles</h2>
            <Link href="/admin/knowledge-center" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          {recentArticles.length === 0 ? (
            <p className="text-slate-500 text-sm py-8 text-center">No articles yet.</p>
          ) : (
            <div className="space-y-3">
              {recentArticles.map((article) => (
                <Link
                  key={article._id?.toString()}
                  href={`/admin/knowledge-center/${article._id?.toString()}/edit`}
                  className="block p-3 rounded-lg bg-slate-900/50 hover:bg-slate-700/50 transition-colors border border-slate-700/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white truncate">{article.title}</p>
                      <p className="text-sm text-slate-400 capitalize">{article.category.replace('-', ' ')}</p>
                    </div>
                    <StatusBadge status={article.status} />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {article.updatedAt ? formatRelativeTime(article.updatedAt) : 'Unknown date'}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction href="/admin/services/new" label="Add Service" icon="+" />
          <QuickAction href="/admin/countries/new" label="Add Country" icon="+" />
          <QuickAction href="/admin/knowledge-center/new" label="Write Article" icon="✍" />
          <QuickAction href="/admin/settings" label="Site Settings" icon="⚙" />
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({
  title,
  value,
  subtitle,
  badge,
  href,
  color
}: {
  title: string
  value: number
  subtitle?: string
  badge?: string
  href: string
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'cyan'
}) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/30',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
    rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/30',
    cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30',
  }

  return (
    <Link
      href={href}
      className={`block p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} border hover:scale-[1.02] transition-transform`}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-slate-300">{title}</span>
        {badge && (
          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </Link>
  )
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    resolved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    published: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    draft: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    archived: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[status] || colors.draft}`}>
      {status}
    </span>
  )
}

// Quick Action Button
function QuickAction({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-700/50 border border-slate-700/30 transition-colors text-sm text-slate-300 hover:text-white"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

// Format relative time helper
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
