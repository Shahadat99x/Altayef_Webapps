'use client'

import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { SectionHeader } from '@/components/public/SectionHeader'
import { Card } from '@/components/public/Card'
import { Service } from '@/lib/models/schema'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

// Default highlights for services (fallback)
const DEFAULT_HIGHLIGHTS = [
    'Complete document preparation',
    'Step-by-step guidance',
    'Submission support',
]

export function ServicesPreview({ services }: { services: Service[] }) {
    if (services.length === 0) {
        return (
            <Section variant="slate" className="border-t border-slate-200">
                <Reveal>
                    <SectionHeader
                        title="Our Services"
                        description="Comprehensive visa processing solutions."
                    />
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

    return (
        <Section variant="slate" className="border-t border-slate-200">
            <Reveal>
                <SectionHeader
                    title="Our Services"
                    description="Comprehensive visa processing solutions."
                    linkHref="/services"
                    linkLabel="View All Services"
                />
            </Reveal>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => {
                    // First service gets featured treatment
                    const isFeatured = index === 0 && services.length <= 2

                    return (
                        <StaggerItem key={service._id?.toString()}>
                            <Card
                                href={`/services/${service.slug}`}
                                hoverEffect
                                className={`group flex flex-col h-full p-6 ${isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                            >
                                {/* Icon Badge */}
                                <div className="mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h3>

                                {/* Summary */}
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {service.summary}
                                </p>

                                {/* Highlights */}
                                <ul className="space-y-2 mb-5 flex-grow">
                                    {DEFAULT_HIGHLIGHTS.slice(0, 3).map((highlight, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                            <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Meta Row + CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            Processing
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                            Support
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Details
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Card>
                        </StaggerItem>
                    )
                })}
            </Stagger>
        </Section>
    )
}
