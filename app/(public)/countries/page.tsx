import { listCountriesAdmin } from '@/lib/data/countries'
import Link from 'next/link'
import Image from 'next/image'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'
import { CoverMedia } from '@/components/public/CoverMedia'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

export const metadata = {
    title: 'Destinations | Altayef',
    description: 'Explore visa processing for top destinations like Saudi Arabia and more.',
}

// Serialize helper for client components
function serialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data))
}

export default async function CountriesPage() {
    const countries = await listCountriesAdmin({ status: 'published' })

    // Highlight Saudi if featured, or just first featured
    const featured = countries.filter(c => c.featured)
    const others = countries.filter(c => !c.featured)

    return (
        <PageShell
            title="Destinations"
            description="Professional processing for major global destinations."
        >
            {featured.length > 0 && (
                <Reveal className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Featured Destinations</h2>
                    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                        {serialize(featured).map(country => (
                            <Link
                                key={country.slug}
                                href={`/countries/${country.slug}`}
                                className="group relative block h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                            >
                                {country.coverImageUrl ? (
                                    <div className="absolute inset-0">
                                        <Image
                                            src={country.coverImageUrl}
                                            alt={country.coverImageAlt || country.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transform-none"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-slate-900">
                                        <div className={`w-full h-full transition-transform duration-700 group-hover:scale-110 motion-reduce:transform-none ${country.name.includes('Saudi') ? 'bg-emerald-900' : 'bg-blue-900'}`}>
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 p-6 sm:p-8 z-20 w-full">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{country.name}</h3>
                                    <p className="text-slate-200 line-clamp-2 max-w-lg text-sm sm:text-base">{country.overview}</p>
                                    <span className="mt-4 sm:mt-6 inline-flex items-center text-white font-semibold group-hover:underline decoration-2 underline-offset-4">
                                        View Process &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Reveal>
            )}

            <Stagger className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {serialize(others).map((country) => (
                    <StaggerItem key={country.slug}>
                        <Card
                            href={`/countries/${country.slug}`}
                            hoverEffect
                            className="flex flex-col h-full group p-0"
                        >
                            {/* Cover Image */}
                            <CoverMedia
                                src={country.coverImageUrl}
                                alt={country.coverImageAlt}
                                type="country"
                            />

                            <div className="p-5 flex-1 flex flex-col">
                                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{country.name}</h2>
                                <p className="text-slate-600 mb-4 line-clamp-2 text-sm flex-1 leading-relaxed">
                                    {country.overview}
                                </p>
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                    <span className="block text-slate-400 mb-0.5">Processing Time</span>
                                    <span className="text-slate-900">{country.timelineText}</span>
                                </div>
                                <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform motion-reduce:transform-none inline-block">
                                    Details &rarr;
                                </span>
                            </div>
                        </Card>
                    </StaggerItem>
                ))}
            </Stagger>

            {countries.length === 0 && (
                <div className="text-center text-slate-500 py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No destinations available at the moment.
                </div>
            )}
        </PageShell>
    )
}
