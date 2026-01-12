'use client'

import Link from 'next/link'
import { Section } from '@/components/public/Section'
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
                    {sortedCountries.slice(0, 6).map((country) => {
                        const isSaudi = country.name.includes("Saudi");
                        return (
                            <StaggerItem key={country._id?.toString()}>
                                <Card
                                    href={`/countries/${country.slug}`}
                                    hoverEffect
                                    className={`group relative min-h-[200px] flex flex-col justify-between p-6 border-slate-200 h-full ${isSaudi ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
                                >
                                    <div className="mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{country.name}</h3>
                                        <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                                            View Requirements <span aria-hidden="true" className="ml-1">&rarr;</span>
                                        </div>
                                    </div>
                                </Card>
                            </StaggerItem>
                        )
                    })}

                    {/* View All Card if we have many countries */}
                    {countries.length > 5 && (
                        <StaggerItem>
                            <Link href="/countries" className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto bg-slate-50 border-2 border-dashed border-slate-200 hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center p-8 h-full min-h-[200px]">
                                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">View All Destinations</h3>
                                <p className="text-sm text-slate-500 mt-2">Explore our full list of processed countries</p>
                            </Link>
                        </StaggerItem>
                    )}
                </Stagger>
            )}
        </Section>
    )
}

