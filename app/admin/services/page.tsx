import Link from 'next/link'
import { listServicesAdmin } from '@/lib/data/services'
import { ADMIN_STYLES } from '@/lib/admin-styles'

export default async function AdminServicesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; status?: string }>
}) {
    const { q, status } = await searchParams
    const services = await listServicesAdmin({ q, status })

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className={ADMIN_STYLES.H1}>Services</h1>
                <Link
                    href="/admin/services/new"
                    className={ADMIN_STYLES.BUTTON_PRIMARY}
                >
                    Create New
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded shadow overflow-hidden border border-slate-200 dark:border-slate-800">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-900">
                        <tr>
                            <th className={ADMIN_STYLES.TABLE_HEADER}>Title</th>
                            <th className={ADMIN_STYLES.TABLE_HEADER}>Status</th>
                            <th className={ADMIN_STYLES.TABLE_HEADER}>Slug</th>
                            <th className={ADMIN_STYLES.TABLE_HEADER + " text-right"}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-950 divide-y divide-slate-200 dark:divide-slate-800">
                        {services.map((service) => (
                            <tr key={service._id?.toString()}>
                                <td className={ADMIN_STYLES.TABLE_CELL}>
                                    <div className={ADMIN_STYLES.TABLE_CELL_MAIN}>{service.title}</div>
                                    {service.featured && <span className="text-xs text-yellow-600 font-bold">Featured</span>}
                                </td>
                                <td className={ADMIN_STYLES.TABLE_CELL}>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${service.status === 'published' ? 'bg-green-100 text-green-800' :
                                            service.status === 'archived' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {service.status}
                                    </span>
                                </td>
                                <td className={ADMIN_STYLES.TABLE_CELL}>
                                    {service.slug}
                                </td>
                                <td className={ADMIN_STYLES.TABLE_CELL + " text-right"}>
                                    <Link href={`/admin/services/${service._id}/edit`} className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {services.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No services found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        </div >
    )
}
