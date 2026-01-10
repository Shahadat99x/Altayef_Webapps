import Link from 'next/link'
import { listArticlesByCategoryPublic } from '@/lib/data/articles'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'

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
        <PageShell
            title={CATEGORIES[category]}
            description="Browse all articles in this section."
            headerAction={
                <Link href="/knowledge-center" className="text-sm text-blue-100 hover:text-white inline-flex items-center transition-colors">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Knowledge Center
                </Link>
            }
        >
            {articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
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
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="flex justify-between items-center mt-auto text-xs text-slate-400 border-t border-slate-50 pt-4">
                                    <span>{article.authorName || 'Altayef Team'}</span>
                                    <span>{new Date(article.lastUpdatedAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500 text-lg mb-4">No articles found in this category yet.</p>
                    <Link href="/knowledge-center" className="text-blue-600 font-medium hover:underline inline-flex items-center">
                        Explore other categories
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            )}
        </PageShell>
    )
}
