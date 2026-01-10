import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { Service } from '@/lib/models/schema'

export function ServicesPreview({ services }: { services: Service[] }) {
    if (services.length === 0) {
        return (
            <Section variant="slate" className="border-t border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
                            Our Services
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Comprehensive visa processing solutions.
                        </p>
                    </div>
                </div>
                <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-slate-500 mb-4">No services currently listed on the homepage.</p>
                    <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                        Contact us for custom inquiries
                    </Link>
                </div>
            </Section>
        )
    }

    // Special layout for reduced number of services could go here, but for now we stick to grid
    return (
        <Section variant="slate" className="border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
                        Our Services
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Comprehensive visa processing solutions.
                    </p>
                </div>
                <Link href="/services" className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center">
                    View All Services <span aria-hidden="true" className="ml-2">&rarr;</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <Card key={service._id?.toString()} href={`/services/${service.slug}`} hoverEffect className="flex flex-col h-full">
                        <div className="mb-4">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                {/* Fallback icon since we don't have rich icons in schema yet */}
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed text-sm">
                            {service.summary}
                        </p>
                        <div className="flex items-center text-sm font-bold text-blue-600 mt-auto">
                            Learn more <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    )
}
