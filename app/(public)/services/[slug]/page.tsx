import { getServiceBySlugPublic } from '@/lib/data/services'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const service = await getServiceBySlugPublic(slug)
    if (!service) return {}

    return {
        title: service.seo?.title || service.title,
        description: service.seo?.description || service.summary,
    }
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const service = await getServiceBySlugPublic(slug)

    if (!service) {
        notFound()
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        {service.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500">
                        {service.summary}
                    </p>
                    <div className="mt-6 flex items-center space-x-4">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            Timeline: {service.timelineText}
                        </span>
                        {service.featured && (
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                Featured Choice
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <article className="prose prose-blue max-w-none text-gray-700">
                        {/* Treating content as safe HTML/Markdown string for now. 
                   If actual Markdown, we'd need a parser. 
                   Assuming it's just pre-formatted text or simple HTML if admin inputs it.
                   For safety against XSS if admin is trusted, we can use dangerouslySetInnerHTML logic OR just whitespace-pre-wrap 
                */}
                        <div className="whitespace-pre-wrap">{service.content}</div>
                    </article>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Requirements Card */}
                    {service.requirements.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Requirements</h3>
                            <ul className="space-y-3">
                                {service.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="ml-2 text-sm text-gray-600">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* CTA Card */}
                    <div className="bg-blue-600 rounded-lg p-6 text-white shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Ready to start?</h3>
                        <p className="text-blue-100 mb-6">
                            Book a consultation with our experts to begin your {service.title} process.
                        </p>
                        <Link href="/contact" className="block w-full text-center bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-50 transition">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
