import Link from 'next/link'
import { listArticlesByCategoryPublic } from '@/lib/data/articles'
import { PageShell } from '@/components/public/PageShell'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'

export const metadata = {
    title: 'Knowledge Center | Altayef - Visa Processing & Legal Guidance',
    description: 'Expert guides, process steps, and country-specific visa information for Bangladeshi citizens.',
}

export default async function KnowledgeCenterPage() {
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
        <PageShell
            title="Knowledge Center"
            description="Everything you need to know about visa processing, legal requirements, and travel to the Middle East and beyond."
        >
            <div className="space-y-16">
                {sections.map((section) => (
                    <section key={section.category}>
                        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                            <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                            <Link
                                href={`/knowledge-center/${section.category}`}
                                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
                            >
                                View All
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {section.articles.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-8">
                                {section.articles.map((article) => (
                                    <Card
                                        key={article._id?.toString()}
                                        href={`/knowledge-center/${article.category}/${article.slug}`}
                                        hoverEffect
                                        className="flex flex-col h-full group p-0 overflow-hidden"
                                    >
                                        {article.coverImageUrl && (
                                            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                                                <img
                                                    src={article.coverImageUrl}
                                                    alt={article.coverImageAlt || article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                            </div>
                                        )}
                                        <div className="p-6 flex flex-col flex-1">
                                            {article.featured && (
                                                <span className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider inline-block">
                                                    Featured
                                                </span>
                                            )}
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
                                                {article.excerpt}
                                            </p>
                                            <div className="text-xs text-slate-400 mt-auto pt-4 border-t border-slate-50 flex items-center">
                                                <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {new Date(article.lastUpdatedAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-slate-500 italic bg-slate-50 p-6 rounded-lg text-center border border-dashed border-slate-200">
                                No articles yet in this section.
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </PageShell>
    )
}
