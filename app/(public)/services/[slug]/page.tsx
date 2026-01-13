import { getServiceBySlugPublic } from '@/lib/data/services'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'
import MarkdownRenderer from '@/components/MarkdownRenderer'

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
        <PageShell
            title={service.title}
            description={service.summary}
            headerAction={
                service.featured ? (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        Featured Choice
                    </span>
                ) : null
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Card className="p-8 md:p-10">
                        <MarkdownRenderer content={service.content} className="prose-slate prose-headings:text-slate-900 prose-p:leading-relaxed prose-li:text-slate-600" />
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Requirements Card */}
                    <Card className="p-6 bg-slate-50 border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                            <span className="bg-blue-100 p-1.5 rounded-md mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            Requirements
                        </h3>
                        {service.requirements.length > 0 ? (
                            <ul className="space-y-4">
                                {service.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-slate-600">
                                        <span className="mr-3 text-slate-400 mt-0.5">•</span>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-500 italic">No specific requirements listed.</p>
                        )}

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Estimated Timeline</h4>
                            <p className="text-slate-900 font-medium">{service.timelineText}</p>
                        </div>
                    </Card>

                    {/* CTA Card */}
                    <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                        <h3 className="text-xl font-bold mb-3 relative z-10">Ready to start?</h3>
                        <p className="text-blue-100 mb-6 text-sm relative z-10 leading-relaxed">
                            Book a consultation with our experts to begin your {service.title} process.
                        </p>
                        <Link href="/contact" className="block w-full text-center bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition shadow-sm relative z-10">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </PageShell>
    )
}
