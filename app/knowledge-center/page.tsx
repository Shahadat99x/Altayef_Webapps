import Link from 'next/link'
import { listArticlesByCategoryPublic } from '@/lib/data/articles'

export const metadata = {
    title: 'Knowledge Center | Altayef - Visa Processing & Legal Guidance',
    description: 'Expert guides, process steps, and country-specific visa information for Bangladeshi citizens.',
}

export default async function KnowledgeCenterPage() {
    // Fetch latest from each category or just a mix. For now, let's fetch all and group in UI or fetch recent.
    // Efficient approach: fetch 4 latest from each major category.
    const guideArticles = await listArticlesByCategoryPublic('guides')
    const processArticles = await listArticlesByCategoryPublic('process')
    const countryArticles = await listArticlesByCategoryPublic('countries')
    const legalArticles = await listArticlesByCategoryPublic('legal')

    const sections = [
        { title: 'Visa Guides', category: 'guides', articles: guideArticles.slice(0, 3) },
        { title: 'Process & Steps', category: 'process', articles: processArticles.slice(0, 3) },
        { title: 'Country Rules', category: 'countries', articles: countryArticles.slice(0, 3) },
        { title: 'Legal & Compliance', category: 'legal', articles: legalArticles.slice(0, 3) },
    ]

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-900 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Knowledge Center</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Everything you need to know about visa processing, legal requirements, and travel to the Middle East and beyond.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-12">
                    {sections.map((section) => (
                        <section key={section.category}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                                <Link href={`/knowledge-center/${section.category}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                    View All →
                                </Link>
                            </div>

                            {section.articles.length > 0 ? (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {section.articles.map((article) => (
                                        <Link key={article._id?.toString()} href={`/knowledge-center/${article.category}/${article.slug}`} className="block group">
                                            <article className="bg-white rounded-lg shadow hover:shadow-md transition p-6 h-full flex flex-col border border-gray-100">
                                                {article.featured && <span className="text-xs font-bold text-yellow-600 mb-2 uppercase tracking-wide">Featured</span>}
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">{article.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{article.excerpt}</p>
                                                <div className="text-xs text-gray-400 mt-auto">
                                                    Updated: {new Date(article.lastUpdatedAt).toLocaleDateString()}
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No articles yet in this section.</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
