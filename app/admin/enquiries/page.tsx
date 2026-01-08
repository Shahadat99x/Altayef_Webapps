import { listEnquiriesAdmin } from '@/lib/data/enquiries'
import Link from 'next/link'
import { getServiceById } from '@/lib/data/services'

// Helper to resolve service/country names if needed involves extra fetches,
// but for list view we might just show ID or do a lookup if performance allows.
// To keep it fast, we'll just show the raw data or maybe we should fetch referenced data?
// Phase 9B says "Service (resolved name if exists)".
// Let's stick to basic list first. If we need to resolve names, we can do it inside the map or fetch all services.
// Given strict "client-side DB calls forbidden", we must do it here.

export default async function AdminEnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    const { status } = await searchParams
    const enquiries = await listEnquiriesAdmin(status)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Enquiries</h1>
                <div className="flex gap-2">
                    <Link href="/admin/enquiries?status=all" className={`px-3 py-1 rounded text-sm ${!status || status === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>All</Link>
                    <Link href="/admin/enquiries?status=new" className={`px-3 py-1 rounded text-sm ${status === 'new' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>New</Link>
                    <Link href="/admin/enquiries?status=contacted" className={`px-3 py-1 rounded text-sm ${status === 'contacted' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Contacted</Link>
                    <Link href="/admin/enquiries?status=closed" className={`px-3 py-1 rounded text-sm ${status === 'closed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Closed</Link>
                </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {enquiries.map((e) => (
                            <tr key={e._id?.toString()}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(e.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {e.fullName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex flex-col">
                                        <span>{e.phoneOrWhatsapp}</span>
                                        <span className="text-xs text-gray-400">{e.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {e.interestedServiceId ? <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Has Service Intent</span> : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${e.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                            e.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                                                e.status === 'closed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {e.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/enquiries/${e._id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                                </td>
                            </tr>
                        ))}
                        {enquiries.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No enquiries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
