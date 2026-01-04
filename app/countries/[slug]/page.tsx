import { getCountryBySlugPublic } from '@/lib/data/countries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const country = await getCountryBySlugPublic(slug)
    if (!country) return {}

    return {
        title: country.seo?.title || `${country.name} Visa Processing | Altayef`,
        description: country.seo?.description || country.overview,
    }
}

export default async function CountryDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const country = await getCountryBySlugPublic(slug)

    if (!country) {
        notFound()
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-blue-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                        {country.name}
                    </h1>
                    <p className="mt-6 max-w-3xl text-xl text-blue-100">
                        {country.overview}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        {country.supportedVisaTypes.map(type => (
                            <span key={type} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-800 text-blue-200 border border-blue-700">
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Abstract Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Description */}
                    {country.content && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                            <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-wrap">
                                {country.content}
                            </div>
                        </section>
                    )}

                    {/* Process Steps */}
                    {country.processSteps.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h2>
                            <div className="space-y-6">
                                {country.processSteps.map((step, idx) => (
                                    <div key={idx} className="flex">
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold border-2 border-blue-200">
                                                {idx + 1}
                                            </div>
                                        </div>
                                        <div className="pt-1">
                                            <p className="text-gray-700 text-lg">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Requirements */}
                    {country.requirements.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                            <ul className="grid gap-4 sm:grid-cols-2">
                                {country.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start bg-gray-50 p-4 rounded-lg">
                                        <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Key Info Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 sticky top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">At a Glance</h3>

                        <div className="space-y-4 mb-8">
                            <div>
                                <span className="block text-sm text-gray-500">Processing Time</span>
                                <span className="block font-medium text-gray-900">{country.timelineText}</span>
                            </div>
                            {country.feesDisclaimer && (
                                <div>
                                    <span className="block text-sm text-gray-500">Fees</span>
                                    <span className="block font-medium text-gray-900">{country.feesDisclaimer}</span>
                                </div>
                            )}
                        </div>

                        <Link href="/contact" className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                            Book Consultation
                        </Link>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Professional assistance guaranteed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
