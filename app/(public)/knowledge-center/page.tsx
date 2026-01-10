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
        <div className="bg-gray-50 dark:bg-slate-900 min-h-full">
            <div className="bg-blue-900 dark:bg-blue-950 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Knowledge Center</h1>
                <p className="text-xl text-blue-100 dark:text-blue-200 max-w-2xl mx-auto">
                    Everything you need to know about visa processing, legal requirements, and travel to the Middle East and beyond.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-12">
                    {sections.map((section) => (
                        <section key={section.category}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
                                <Link href={`/knowledge-center/${section.category}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                                    View All →
                                </Link>
                            </div>

                            {section.articles.length > 0 ? (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {section.articles.map((article) => (
                                        <Link key={article._id?.toString()} href={`/knowledge-center/${article.category}/${article.slug}`} className="block group">
                                            <article className="bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition h-full flex flex-col border border-slate-100 dark:border-slate-700 overflow-hidden">
                                                {article.coverImageUrl && (
                                                    <div className="relative h-48 w-full bg-gray-200 dark:bg-slate-700">
                                                        <img
                                                            src={article.coverImageUrl}
                                                            alt={article.coverImageAlt || article.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-6 flex flex-col flex-1">
                                                    {article.featured && <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500 mb-2 uppercase tracking-wide">Featured</span>}
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-2">{article.title}</h3>
                                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1 line-clamp-3">{article.excerpt}</p>
                                                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-auto">
                                                        Updated: {new Date(article.lastUpdatedAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 dark:text-slate-400 italic">No articles yet in this section.</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
