'use client'

import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { Testimonial } from '@/lib/models/schema'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

export function TestimonialsPreview({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <Section variant="slate" className="relative overflow-hidden">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-60 -z-10" />

            <Reveal className="text-center mb-16 relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                    Trusted by People Like You
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    We have successfully helped thousands of candidates reach their destinations.
                </p>
            </Reveal>

            {testimonials.length === 0 ? (
                <div className="text-center py-12 text-slate-500 relative z-10">
                    <p>Success stories coming soon.</p>
                </div>
            ) : (
                <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {testimonials.slice(0, 3).map((t) => (
                        <StaggerItem key={t._id?.toString()}>
                            <Card className="p-8 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                <div className="mb-6">
                                    <div className="flex gap-1 text-yellow-400 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                    <blockquote className="text-slate-700 leading-relaxed italic">
                                        &quot;{t.quote}&quot;
                                    </blockquote>
                                </div>

                                <div className="mt-auto flex items-center gap-4 pt-6 border-t border-slate-50">
                                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                        {t.authorPhotoUrl ? (
                                            <img src={t.authorPhotoUrl} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            (t.authorName?.charAt(0) || 'C')
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">
                                            {t.anonymized ? 'Verified Client' : t.authorName}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {t.country || 'Visa Applicant'}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </StaggerItem>
                    ))}
                </Stagger>
            )}

            <Reveal className="text-center mt-12 relative z-10">
                <Link href="/about/testimonials" className="text-blue-600 font-semibold hover:text-blue-700 hover:-translate-y-0.5 transition-all inline-block">
                    Read More Reviews &rarr;
                </Link>
            </Reveal>
        </Section>
    )
}

