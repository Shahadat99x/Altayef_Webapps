import { listTestimonialsAdmin } from '@/lib/data/testimonials'
import Link from 'next/link'

export default async function TestimonialListPage() {
    const testimonials = await listTestimonialsAdmin()

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Testimonials</h1>
                <Link href="/admin/testimonials/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Add Testimonial
                </Link>
            </div>

            <div className="bg-white shadow rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Snippet</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Settings</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {testimonials.map((t) => (
                            <tr key={t._id?.toString()}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{t.authorName}</div>
                                    {t.anonymized && <span className="text-xs text-orange-600 bg-orange-100 px-2 rounded-full">Anonymized</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                                    {t.quote.substring(0, 50)}...
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${t.status === 'published' ? 'bg-green-100 text-green-800' :
                                            t.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {t.featured && <span className="text-xs text-blue-600 font-bold block">★ Featured</span>}
                                    Ord: {t.order}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/testimonials/${t._id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
