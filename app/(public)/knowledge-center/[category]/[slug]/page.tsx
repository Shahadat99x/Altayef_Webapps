import Link from 'next/link'
import { getArticleBySlugPublic } from '@/lib/data/articles'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
    const { category, slug } = await params
    const article = await getArticleBySlugPublic(category, slug)
    if (!article) return {}

    return {
        title: article.seo?.title || article.title,
        description: article.seo?.description || article.excerpt,
        openGraph: {
            images: article.coverImageUrl ? [{ url: article.coverImageUrl, alt: article.coverImageAlt || article.title }] : undefined
        }
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
        <PageShell
            title={article.title}
            description="" // Empty description as we use custom header in the card or the title is enough
            headerAction={
                <div className="flex items-center gap-2 text-sm text-blue-100">
                    <Link href="/knowledge-center" className="hover:text-white transition-colors">Knowledge Center</Link>
                    <span>/</span>
                    <Link href={`/knowledge-center/${category}`} className="hover:text-white capitalize transition-colors">{category}</Link>
                </div>
            }
        >
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            <div className="max-w-4xl mx-auto">
                <Card className="p-8 md:p-12 overflow-visible">
                    <div className="mb-8 border-b border-slate-100 pb-8">
                        <div className="flex flex-wrap items-center justify-between text-sm text-slate-500 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{article.authorName || 'Altayef Team'}</span>
                                <span className="text-slate-300">•</span>
                                <span>Updated {new Date(article.lastUpdatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="text-slate-300">•</span>
                                <span>{Math.ceil(article.content.split(/\s+/).length / 200)} min read</span>
                            </div>
                            {article.featured && (
                                <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2.5 py-0.5 rounded font-semibold text-xs uppercase tracking-wide">
                                    Featured
                                </span>
                            )}
                        </div>
                    </div>

                    {article.coverImageUrl && (
                        <figure className="mb-10 -mx-8 md:-mx-12 mt-[-2rem] md:mt-[-3rem]">
                            <img
                                src={article.coverImageUrl}
                                alt={article.coverImageAlt || article.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                            {article.coverImageCaption && (
                                <figcaption className="mt-3 text-center text-sm text-slate-500 italic px-8">
                                    {article.coverImageCaption}
                                </figcaption>
                            )}
                        </figure>
                    )}

                    <div className="max-w-none text-slate-800">
                        <p className="text-xl text-slate-600 mb-10 font-light italic border-l-4 border-blue-500 pl-6 leading-relaxed bg-blue-50/50 py-4 rounded-r-lg">
                            {article.excerpt}
                        </p>

                        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl">
                            <MarkdownRenderer content={article.content} />
                        </div>
                    </div>

                    {article.faq.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                                <span className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {article.faq.map((item, idx) => (
                                    <div key={idx} className="bg-slate-50/80 rounded-xl p-6 border border-slate-100 transition-colors hover:bg-slate-50">
                                        <h3 className="text-lg font-bold text-slate-900 mb-3">{item.question}</h3>
                                        <p className="text-slate-700 leading-relaxed">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </PageShell>
    )
}
