```
import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { Country } from '@/lib/models/schema'

export function DestinationsPreview({ countries }: { countries: Country[] }) {
    return (
        <Section variant="white" className="relative overflow-hidden">
             {/* Gradient Accent */}
             <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4 relative z-10">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
                        Destinations
                    </h2>
                    <p className="text-slate-600 text-lg">
                        We specialize in visa processing for key global destinations.
                    </p>
                </div>
                <Link href="/countries" className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center">
                    Explore All <span aria-hidden="true" className="ml-2">&rarr;</span>
                </Link>
            </div>

            {countries.length === 0 ? (
                 <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500">Destinations are currently being updated.</p>
                 </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Featured / Saudi First Logic handled by sorting in parent, we just render cards here */}
                    {countries.map((country, index) => {
                         const isSaudi = country.name.includes("Saudi");
                         return (
                            <Card 
                                key={country._id?.toString()} 
                                href={`/ countries / ${ country.slug } `} 
                                className={`group overflow - hidden relative min - h - [280px] flex flex - col justify - end ${ isSaudi ? 'ring-2 ring-blue-600 ring-offset-2' : '' } `}
                            >
                                        <div className="inline-flex items-center text-white font-bold text-sm uppercase tracking-wide border-b-2 border-transparent group-hover:border-blue-500 transition-colors pb-1">
                                            View Requirements
                                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : (
                        <div className="col-span-full py-20 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                            Updating destination list...
                        </div>
                    )}

                    {/* View All Card */}
                    {countries.length > 0 && (
                        <Link href="/countries" className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">View All Destinations</h3>
                            <p className="text-sm text-slate-500 mt-2">Explore our full list of processed countries</p>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    )
}
