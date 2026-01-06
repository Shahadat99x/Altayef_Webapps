import Link from 'next/link'
import { listCountriesAdmin } from '@/lib/data/countries'
// import { deleteCountryAction } from '@/lib/actions/countries'

export default async function AdminCountriesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; status?: string }>
}) {
    const { q, status } = await searchParams
    const countries = await listCountriesAdmin({ q, status })

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Countries</h1>
                <Link
                    href="/admin/countries/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Country
                </Link>
            </div>

            <div className="bg-white rounded shadow overflowing-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {countries.map((country) => (
                            <tr key={country._id?.toString()}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{country.name}</div>
                                    {country.featured && <span className="text-xs text-yellow-600 font-bold">Featured</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${country.status === 'published' ? 'bg-green-100 text-green-800' :
                                            country.status === 'archived' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {country.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {country.slug}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/countries/${country._id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </Link>
                                    {/* <form action={deleteCountryAction.bind(null, country._id?.toString() || '')} className="inline">
                                        <button className="text-red-600 hover:text-red-900">Archive</button>
                                    </form> */}
                                </td>
                            </tr>
                        ))}
                        {countries.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No countries found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
