'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { CoverMedia } from '@/components/public/CoverMedia'
import { Country } from '@/lib/models/schema'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { stripMarkdownToText } from '@/lib/text-utils'

export function DestinationsPreview({ countries }: { countries: Country[] }) {
    // Sort Saudi Arabia first if present
    const sortedCountries = [...countries].sort((a, b) => {
        const isSaudiA = a.name.includes("Saudi")
        const isSaudiB = b.name.includes("Saudi")
        if (isSaudiA && !isSaudiB) return -1
        if (!isSaudiA && isSaudiB) return 1
        return 0
    })

    // Show max 6 countries on homepage
    const displayCountries = sortedCountries.slice(0, 6)

    return (
        <Section variant="white" className="relative overflow-hidden">
            {/* Gradient Accent */}
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

            <Reveal>
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4 relative z-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
                            Destinations
                        </h2>
                        <p className="text-slate-600 text-lg">
                            We specialize in visa processing for key global destinations.
                        </p>
                    </div>
                    <Link href="/countries" className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center hover:-translate-y-0.5 transition-transform">
                        Explore All <span aria-hidden="true" className="ml-2">&rarr;</span>
                    </Link>
                </div>
            </Reveal>

            {countries.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500">Destinations are currently being updated.</p>
                </div>
            ) : (
                <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayCountries.map((country) => {
                        const isSaudi = country.name.includes("Saudi")
                        // Clean excerpt from overview (short) or stripped content
                        const excerpt = country.overview || (country.content ? stripMarkdownToText(country.content).slice(0, 100) : '')

                        return (
                            <StaggerItem key={country._id?.toString()}>
                                <Card
                                    href={`/countries/${country.slug}`}
                                    hoverEffect
                                    className={`flex flex-col h-full group p-0 ${isSaudi ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
                                >
                                    {/* Cover Image with overlay for featured look */}
                                    <div className="relative">
                                        {country.coverImageUrl ? (
                                            <div className="relative aspect-video overflow-hidden rounded-t-xl">
                                                <Image
                                                    src={country.coverImageUrl}
                                                    alt={country.coverImageAlt || country.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                {isSaudi && (
                                                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <CoverMedia
                                                src={null}
                                                alt={country.name}
                                                type="country"
                                                aspect="16/9"
                                            />
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {country.name}
                                        </h3>
                                        <p className="text-slate-600 line-clamp-2 text-sm flex-1 leading-relaxed mb-3">
                                            {excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                                            <span className="text-xs text-slate-500">
                                                {country.timelineText}
                                            </span>
                                            <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform motion-reduce:transform-none">
                                                View &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </StaggerItem>
                        )
                    })}
                </Stagger>
            )}
        </Section>
    )
}
