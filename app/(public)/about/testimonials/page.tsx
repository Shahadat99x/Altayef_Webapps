import { listTestimonialsPublic } from '@/lib/data/testimonials'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Client Testimonials | Altayef',
    description: 'See what our clients say about their experience with Altayef.',
}

export default async function TestimonialsPage() {
    const testimonials = await listTestimonialsPublic()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-5xl">Client Stories</h1>
                <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Success stories from people we&apos;ve helped.
                </p>
            </div>

            {testimonials.length === 0 ? (
                <p className="text-center text-slate-500 dark:text-slate-400">Coming soon.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t._id?.toString()} className={`bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full ${t.featured ? 'ring-2 ring-blue-500 dark:ring-blue-600' : ''}`}>
                            <div className="flex-1">
                                <svg className="h-8 w-8 text-blue-200 dark:text-blue-900/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.096 15.348 15.752 15.939 12.399C15.939 12.399 15.939 11.235 15.253 11.248C14.773 11.258 13.923 11.536 13.433 10.975C12.871 10.334 13.111 9.387 13.111 9.387C13.447 7.776 14.865 6.467 17.587 6.467C20.309 6.467 21.6 7.643 21.6 9.871C21.6 13.336 20.384 18.067 14.017 21ZM4.90801 21L4.90801 18C4.90801 16.096 6.23901 15.752 6.83001 12.399C6.83001 12.399 6.83001 11.235 6.14301 11.248C5.66301 11.258 4.81301 11.536 4.32301 10.975C3.76101 10.334 4.00101 9.387 4.00101 9.387C4.33701 7.776 5.75501 6.467 8.47701 6.467C11.199 6.467 12.49 7.643 12.49 9.871C12.49 13.336 11.274 18.067 4.90801 21Z" />
                                </svg>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </div>

                            <div className="flex items-center pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                <div className="h-10 w-10 flex-shrink-0">
                                    {t.anonymized || !t.authorPhotoUrl ? (
                                        <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm">
                                            {(t.anonymized ? 'V' : t.authorName.charAt(0))}
                                        </div>
                                    ) : (
                                        <img className="h-10 w-10 rounded-full object-cover" src={t.authorPhotoUrl} alt="" />
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {t.anonymized ? 'Verified Client' : t.authorName}
                                    </p>
                                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                                        {t.authorRole && <span>{t.authorRole}</span>}
                                        {t.authorRole && t.country && <span className="mx-1">•</span>}
                                        {t.country && <span>{t.country}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
