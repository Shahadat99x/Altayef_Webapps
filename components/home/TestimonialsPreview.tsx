```
import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { Testimonial } from '@/lib/models/schema'

export function TestimonialsPreview({ testimonials }: { testimonials: Testimonial[] }) {
    return (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map(t => (
                        <div key={t._id?.toString()} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="flex items-center mb-6">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg">
                                    {t.anonymized ? 'V' : (t.authorName?.[0] || 'C')}
                                </div>
                                <div className="ml-4">
                                    <div className="font-bold text-lg">{t.anonymized ? 'Verified Client' : t.authorName}</div>
                                    <div className="text-xs text-blue-300 font-medium uppercase tracking-wide">{t.country} Visa</div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex text-yellow-400 gap-1 text-sm">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-300 italic leading-relaxed text-lg">
                                &quot;{t.quote}&quot;
                            </p>
                        </div>
                    ))}

                    {testimonials.length === 0 && (
                        <div className="col-span-full py-16 text-center text-slate-500 italic bg-white/5 rounded-2xl border border-dashed border-slate-700">
                            Client testimonials are being updated.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
