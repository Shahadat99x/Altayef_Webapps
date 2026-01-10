import { listCountriesAdmin } from '@/lib/data/countries'
import Link from 'next/link'

export const metadata = {
    title: 'Destinations | Altayef',
    description: 'Explore visa processing for top destinations like Saudi Arabia and more.',
}

export default async function CountriesPage() {
    const countries = await listCountriesAdmin({ status: 'published' })

    // Highlight Saudi if featured, or just first featured
    const featured = countries.filter(c => c.featured)
    const others = countries.filter(c => !c.featured)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-5xl">Destinations</h1>
                <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">
                    Professional processing for major global destinations.
                </p>
            </div>

            {featured.length > 0 && (
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Featured Destinations</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {featured.map(country => (
                            <Link
                                key={country.slug}
                                href={`/countries/${country.slug}`}
                                className="group relative block h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-10" />
                                {/* Placeholder for real image - using solid color for now or maybe next/image with placeholder */}
                                <div className="absolute inset-0 bg-blue-900 dark:bg-blue-950 group-hover:bg-blue-800 dark:group-hover:bg-blue-900 transition" />

                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <h3 className="text-3xl font-bold text-white mb-2">{country.name}</h3>
                                    <p className="text-slate-200 line-clamp-2">{country.overview}</p>
                                    <span className="mt-4 inline-block text-white font-semibold border-b-2 border-transparent group-hover:border-white transition-all">
                                        View Process &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-3">
                {others.map((country) => (
                    <Link
                        key={country.slug}
                        href={`/countries/${country.slug}`}
                        className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{country.name}</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                {country.overview}
                            </p>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                <p>Processing: <span className="font-medium text-slate-900 dark:text-slate-200">{country.timelineText}</span></p>
                            </div>
                            <span className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300">
                                Details &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {countries.length === 0 && (
                <div className="text-center text-slate-500 dark:text-slate-400 py-12">
                    No destinations available at the moment.
                </div>
            )}
        </div>
    )
}
