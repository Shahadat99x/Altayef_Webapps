import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { Article } from '@/lib/models/schema'

export function InsightsPreview({ articles }: { articles: Article[] }) {
    return (
        <Section variant="white">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
                        Knowledge Center
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Latest updates, visa guides, and news.
                    </p>
                </div>
                <Link href="/knowledge-center" className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center">
                    Visit Knowledge Center <span aria-hidden="true" className="ml-2">&rarr;</span>
                </Link>
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    <p>No articles available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Card key={article._id?.toString()} href={`/knowledge-center/${article.category}/${article.slug}`} hoverEffect className="flex flex-col h-full p-0">
                            <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                                {article.coverImageUrl ? (
                                    <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <span className="text-4xl">📰</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    {article.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-xs text-slate-500 mb-3 font-medium">
                                    {article.updatedAt ? new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
                                    {article.excerpt}
                                </p>
                                <div className="text-slate-400 text-xs font-medium mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <span className="text-blue-600 group-hover:underline flex items-center gap-1">
                                        Read Article &rarr;
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </Section>
    )
}
