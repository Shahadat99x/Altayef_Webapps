import Link from 'next/link'
import { getArticleBySlugPublic } from '@/lib/data/articles'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
    const { category, slug } = await params
    const article = await getArticleBySlugPublic(category, slug)
    if (!article) return {}

    return {
        title: article.seo?.title || article.title,
        description: article.seo?.description || article.excerpt,
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params
    const article = await getArticleBySlugPublic(category, slug)

    if (!article) {
        notFound()
    }

    // JSON-LD for FAQ
    const jsonLd = article.faq.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': article.faq.map(f => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.answer
            }
        }))
    } : null

    return (
        <div className="bg-white min-h-screen py-12">
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            <article className="max-w-3xl mx-auto px-4 sm:px-6">
                <div className="mb-8 border-b pb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/knowledge-center" className="hover:text-blue-600">Knowledge Center</Link>
                        <span>/</span>
                        <Link href={`/knowledge-center/${category}`} className="hover:text-blue-600 capitalize">{category}</Link>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">{article.title}</h1>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{article.authorName || 'Altayef Team'}</span>
                            <span>•</span>
                            <span>Updated {new Date(article.lastUpdatedAt).toLocaleDateString()}</span>
                        </div>
                        {article.featured && <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-medium text-xs uppercase">Featured</span>}
                    </div>
                </div>

                <div className="prose prose-blue max-w-none text-gray-800">
                    <p className="lead text-xl text-gray-600 mb-8 font-light italic border-l-4 border-blue-500 pl-4">
                        {article.excerpt}
                    </p>

                    {/* Render Content - In a real app use a markdown parser, assuming simple text/html here for MVP or dangerouslySetInnerHTML if trusted */}
                    <div className="whitespace-pre-wrap font-sans leading-relaxed">
                        {article.content}
                    </div>
                </div>

                {article.faq.length > 0 && (
                    <div className="mt-12 pt-12 border-t">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {article.faq.map((item, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                                    <p className="text-gray-700">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    )
}
