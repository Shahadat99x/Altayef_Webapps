'use client'

import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { SectionHeader } from '@/components/public/SectionHeader'
import { Card } from '@/components/public/Card'
import { Country } from '@/lib/models/schema'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

export function DestinationsPreview({ countries }: { countries: Country[] }) {
    const sortedCountries = [...countries].sort((a, b) => {
        const isSaudiA = a.name.includes("Saudi");
        const isSaudiB = b.name.includes("Saudi");
        if (isSaudiA && !isSaudiB) return -1;
        if (!isSaudiA && isSaudiB) return 1;
        return 0;
    });

    return (
        <Section variant="white" className="relative overflow-hidden">
            {/* Gradient Accent */}
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

            <Reveal>
                <SectionHeader
                    title="Destinations"
                    description="We specialize in visa processing for key global destinations."
                    linkHref="/countries"
                    linkLabel="Explore All"
                    className="relative z-10"
                />
            </Reveal>

            {countries.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500">Destinations are currently being updated.</p>
                </div>
            ) : (
                <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {sortedCountries.slice(0, 6).map((country) => {
                        const isSaudi = country.name.includes("Saudi");
                        return (
                            <StaggerItem key={country._id?.toString()}>
                                <Card
                                    href={`/countries/${country.slug}`}
                                    hoverEffect
                                    className={`group flex flex-col h-full p-0 overflow-hidden ${isSaudi ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
                                >
                                    {/* Placeholder Media Slot */}
                                    <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 overflow-hidden">
                                        {/* Decorative gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

                                        {/* Globe icon placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-blue-500/50 shadow-inner ring-1 ring-slate-200/50">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Popular badge for Saudi */}
                                        {isSaudi && (
                                            <div className="absolute top-3 left-3">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    Popular
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                                            {country.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
                                            Visa requirements and processing support
                                        </p>
                                        <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                                            View Requirements
                                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Card>
                            </StaggerItem>
                        )
                    })}

                    {/* View All Card if we have many countries */}
                    {countries.length > 5 && (
                        <StaggerItem>
                            <Link href="/countries" className="group relative overflow-hidden rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center p-8 h-full min-h-[200px]">
                                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">View All Destinations</h3>
                                <p className="text-sm text-slate-500">Explore our full list of countries</p>
                            </Link>
                        </StaggerItem>
                    )}
                </Stagger>
            )}
        </Section>
    )
}
