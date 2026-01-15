'use client'

import Link from 'next/link'
import Image from 'next/image'
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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3">
                                Our Services
                            </h2>
                            <p className="text-slate-600 text-base sm:text-lg">
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

    // Show up to 6 services on homepage
    const displayServices = services.slice(0, 6)

    return (
        <Section variant="slate" className="border-t border-slate-200">
            <Reveal>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3">
                            Our Services
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg">
                            Comprehensive visa processing solutions.
                        </p>
                    </div>
                    <Link href="/services" className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center hover:-translate-y-0.5 transition-transform text-sm sm:text-base">
                        View All Services <span aria-hidden="true" className="ml-2">&rarr;</span>
                    </Link>
                </div>
            </Reveal>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayServices.map((service) => {
                    // Clean excerpt from summary or stripped content
                    const excerpt = service.summary || stripMarkdownToText(service.content).slice(0, 120)

                    return (
                        <StaggerItem key={service._id?.toString()}>
                            <Card href={`/services/${service.slug}`} hoverEffect className="flex flex-col h-full group p-0">
                                {/* Cover Image - matching Destinations design */}
                                <div className="relative">
                                    {service.coverImageUrl ? (
                                        <div className="relative aspect-video overflow-hidden rounded-t-xl">
                                            <Image
                                                src={service.coverImageUrl}
                                                alt={service.coverImageAlt || service.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                            {service.featured && (
                                                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <CoverMedia
                                                src={null}
                                                alt={service.title}
                                                type="service"
                                                aspect="16/9"
                                            />
                                            {service.featured && (
                                                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg z-10">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600 line-clamp-2 text-sm flex-1 leading-relaxed mb-3">
                                        {excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                                        <span className="text-xs text-slate-500">
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
