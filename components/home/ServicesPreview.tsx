'use client'

import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { CoverMedia } from '@/components/public/CoverMedia'
import { Service } from '@/lib/models/schema'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { stripMarkdownToText } from '@/lib/text-utils'

export function ServicesPreview({ services }: { services: Service[] }) {
    if (services.length === 0) {
        return (
            <Section variant="slate" className="border-t border-slate-200">
                <Reveal>
                    <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
                                Our Services
                            </h2>
                            <p className="text-slate-600 text-lg">
                                Comprehensive visa processing solutions.
                            </p>
                        </div>
                    </div>
                </Reveal>
                <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-slate-500 mb-4">No services currently listed on the homepage.</p>
                    <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                        Contact us for custom inquiries
                    </Link>
                </div>
            </Section>
        )
    }

    // Limit to 3 featured items on homepage
    const displayServices = services.slice(0, 6)

    return (
        <Section variant="slate" className="border-t border-slate-200">
            <Reveal>
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
                            Our Services
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Comprehensive visa processing solutions.
                        </p>
                    </div>
                    <Link href="/services" className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center hover:-translate-y-0.5 transition-transform">
                        View All Services <span aria-hidden="true" className="ml-2">&rarr;</span>
                    </Link>
                </div>
            </Reveal>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayServices.map((service) => {
                    // Clean excerpt from summary (already short) or fallback to stripped content
                    const excerpt = service.summary || stripMarkdownToText(service.content).slice(0, 120)

                    return (
                        <StaggerItem key={service._id?.toString()}>
                            <Card href={`/services/${service.slug}`} hoverEffect className="flex flex-col h-full group p-0">
                                {/* Cover Image */}
                                <CoverMedia
                                    src={service.coverImageUrl}
                                    alt={service.coverImageAlt}
                                    type="service"
                                    aspect="16/9"
                                />

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {service.title}
                                        </h3>
                                        {service.featured && (
                                            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold border border-blue-100 shrink-0">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 flex-grow line-clamp-3 leading-relaxed text-sm mb-4">
                                        {excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                                        <span className="inline-flex items-center text-xs text-slate-500">
                                            <svg className="mr-1 h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {service.timelineText}
                                        </span>
                                        <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform motion-reduce:transform-none">
                                            Learn more &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </StaggerItem>
                    )
                })}
            </Stagger>
        </Section>
    )
}
