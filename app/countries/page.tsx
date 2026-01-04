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
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Destinations</h1>
                <p className="mt-4 text-xl text-gray-500">
                    Professional processing for major global destinations.
                </p>
            </div>

            {featured.length > 0 && (
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Destinations</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {featured.map(country => (
                            <Link
                                key={country.slug}
                                href={`/countries/${country.slug}`}
                                className="group relative block h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-10" />
                                {/* Placeholder for real image - using solid color for now or maybe next/image with placeholder */}
                                <div className="absolute inset-0 bg-blue-900 group-hover:bg-blue-800 transition" />

                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <h3 className="text-3xl font-bold text-white mb-2">{country.name}</h3>
                                    <p className="text-gray-200 line-clamp-2">{country.overview}</p>
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
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">{country.name}</h2>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {country.overview}
                            </p>
                            <div className="text-sm text-gray-500 mb-4">
                                <p>Processing: <span className="font-medium text-gray-900">{country.timelineText}</span></p>
                            </div>
                            <span className="text-blue-600 font-medium hover:text-blue-800">
                                Details &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {countries.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    No destinations available at the moment.
                </div>
            )}
        </div>
    )
}
