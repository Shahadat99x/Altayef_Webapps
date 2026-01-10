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
                            <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                {article.coverImageUrl ? (
                                    <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex-grow flex flex-col">
                                <div className="text-xs text-slate-500 mb-3 font-medium">
                                    {new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm mt-auto group-hover:translate-x-1 transition-transform">
                                    Read Article <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-full py-16 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                            No articles published yet.
                        </div>
                    )}
                </div>

                <div className="text-center mt-12">
                    <Link href="/knowledge-center" className="inline-flex items-center text-slate-900 dark:text-white font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b-2 border-transparent hover:border-blue-600 pb-1">
                        View Knowledge Center &rarr;
                    </Link>
                </div>
            </div >
        </section >
    )
}
