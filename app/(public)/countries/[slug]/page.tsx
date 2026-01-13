import { getCountryBySlugPublic } from '@/lib/data/countries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import MarkdownRenderer from '@/components/MarkdownRenderer'

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
            {/* Hero Section - Custom full width to match premium feel */}
            <div className={`relative overflow-hidden pt-32 pb-20 ${country.name.includes('Saudi') ? 'bg-emerald-900' : 'bg-blue-900'}`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4 backdrop-blur-sm border border-white/20">
                        Visa Processing
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
                        {country.name}
                    </h1>
                    <p className="max-w-3xl text-xl text-blue-100 leading-relaxed mb-8">
                        {country.overview}
                    </p>
                    <div className="flex flex-wrap gap-3 sm:justify-start justify-center">
                        {country.supportedVisaTypes.map(type => (
                            <span key={type} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-black/20 text-white border border-white/10 backdrop-blur-sm">
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Section variant="white" className="!py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Description */}
                        {country.content && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
                                <Card className="p-8">
                                    <MarkdownRenderer content={country.content} className="prose-slate" />
                                </Card>
                            </section>
                        )}

                        {/* Process Steps */}
                        {country.processSteps.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Application Process</h2>
                                <div className="space-y-4">
                                    {country.processSteps.map((step, idx) => (
                                        <Card key={idx} className="p-6 flex gap-4 border-l-4 border-l-blue-500 rounded-l-lg">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-slate-700 text-lg leading-relaxed">{step}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Requirements */}
                        {country.requirements.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Requirements</h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {country.requirements.map((req, idx) => (
                                        <Card key={idx} className="p-4 flex items-start bg-slate-50 border-slate-100">
                                            <svg className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-slate-700 font-medium">{req}</span>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Key Info Card */}
                        <Card className="p-6 sticky top-24 shadow-md border-blue-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">At a Glance</h3>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Processing Time</span>
                                    <span className="block font-medium text-slate-900 text-lg">{country.timelineText}</span>
                                </div>
                                {country.feesDisclaimer && (
                                    <div>
                                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fees</span>
                                        <span className="block font-medium text-slate-900">{country.feesDisclaimer}</span>
                                    </div>
                                )}
                            </div>

                            <Link href="/contact" className="block w-full text-center bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                                Book Consultation
                            </Link>
                            <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed">
                                Professional assistance guaranteed.
                            </p>
                        </Card>
                    </div>
                </div>
            </Section>
        </div>
    )
}
