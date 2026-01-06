import Link from 'next/link'
import { listArticlesAdmin } from '@/lib/data/articles'
import { deleteArticleAction as archiveAction } from '@/lib/actions/articles'

export default async function AdminArticlesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; status?: string; category?: string }>
}) {
    const { q, status, category } = await searchParams
    const articles = await listArticlesAdmin({ q, status, category })

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Knowledge Center</h1>
                <Link
                    href="/admin/knowledge/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Article
                </Link>
            </div>

            {/* Filters could be added here as a client component or simple links */}

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {articles.map((article) => (
                            <tr key={article._id?.toString()}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                    <div className="text-sm text-gray-500 overflow-hidden text-ellipsis w-48 whitespace-nowrap">{article.slug}</div>
                                    {article.featured && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Featured</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                    {article.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${article.status === 'published' ? 'bg-green-100 text-green-800' :
                                            article.status === 'archived' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {article.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(article.lastUpdatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/knowledge/${article._id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Edit
                                    </Link>
                                    {/* <form action={archiveAction.bind(null, article._id?.toString() || '')} className="inline">
                                        <button className="text-red-600 hover:text-red-900">Archive</button>
                                    </form> */}
                                </td>
                            </tr>
                        ))}
                        {articles.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No articles found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
