import Link from 'next/link'
import { listArticlesByCategoryPublic } from '@/lib/data/articles'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// Valid categories enum to readable title
const CATEGORIES: Record<string, string> = {
    guides: 'Comprehensive Guides',
    process: 'Visa Process Steps',
    countries: 'Country Specific Rules',
    legal: 'Legal & Compliance',
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params
    const title = CATEGORIES[category]
    if (!title) return {}
    return {
        title: `${title} | Altayef Knowledge Center`,
        description: `Browse our latest ${title.toLowerCase()} for visa processing and travel guidance.`
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params

    if (!CATEGORIES[category]) {
        notFound()
    }

    const articles = await listArticlesByCategoryPublic(category)

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/knowledge-center" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Knowledge Center</Link>
                    <h1 className="text-3xl font-bold text-gray-900">{CATEGORIES[category]}</h1>
                    <p className="text-gray-600 mt-2">Browse all articles in this section.</p>
                </div>

                {articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <Link key={article._id?.toString()} href={`/knowledge-center/${article.category}/${article.slug}`} className="block group">
                                <article className="bg-white rounded-lg shadow hover:shadow-md transition p-6 h-full flex flex-col border border-gray-100">
                                    {article.featured && <span className="text-xs font-bold text-yellow-600 mb-2 uppercase tracking-wide">Featured</span>}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">{article.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 flex-1">{article.excerpt}</p>
                                    <div className="flex justify-between items-center mt-auto text-xs text-gray-500 border-t pt-4">
                                        <span>{article.authorName || 'Altayef Team'}</span>
                                        <span>{new Date(article.lastUpdatedAt).toLocaleDateString()}</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded shadow">
                        <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
                        <Link href="/knowledge-center" className="text-blue-600 mt-4 inline-block hover:underline">Explore other categories</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
