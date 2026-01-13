'use client'

import { Section } from '@/components/public/Section'
import { SectionHeader } from '@/components/public/SectionHeader'
import { Card } from '@/components/public/Card'
import { Article } from '@/lib/models/schema'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

export function InsightsPreview({ articles }: { articles: Article[] }) {
    return (
        <Section variant="white">
            <Reveal>
                <SectionHeader
                    title="Knowledge Center"
                    description="Latest updates, visa guides, and news."
                    linkHref="/knowledge-center"
                    linkLabel="Visit Knowledge Center"
                />
            </Reveal>

            {articles.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    <p>No articles available at the moment.</p>
                </div>
            ) : (
                <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {articles.map((article) => (
                        <StaggerItem key={article._id?.toString()}>
                            <Card href={`/knowledge-center/${article.category}/${article.slug}`} hoverEffect className="group flex flex-col h-full p-0">
                                {/* Thumbnail */}
                                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                                    {article.coverImageUrl ? (
                                        <img
                                            src={article.coverImageUrl}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
                                            <div className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-400 shadow-inner">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        {article.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="text-xs text-slate-500 mb-2 font-medium">
                                        {article.updatedAt ? new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="text-sm font-semibold text-blue-600 inline-flex items-center gap-1 mt-auto">
                                        Read Article
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Card>
                        </StaggerItem>
                    ))}
                </Stagger>
            )}
        </Section>
    )
}
