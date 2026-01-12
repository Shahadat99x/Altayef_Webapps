import { listServicesAdmin } from '@/lib/data/services'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'
import { AnimatedSection, AnimatedGrid, AnimatedGridItem } from '@/components/motion'

export const metadata = {
    title: 'Our Services | Altayef',
    description: 'Professional visa processing and immigration services in Dhaka.',
}

// Serialize helper for client components
function serialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data))
}

export default async function ServicesPage() {
    const services = await listServicesAdmin({ status: 'published' })

    return (
        <PageShell
            title="Our Services"
            description="Comprehensive visa and immigration solutions tailored to your needs."
        >
            <AnimatedGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {serialize(services).map((service) => (
                    <AnimatedGridItem key={service.slug}>
                        <Card
                            href={`/services/${service.slug}`}
                            hoverEffect
                            className="flex flex-col h-full group"
                        >
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{service.title}</h2>
                                    {service.featured && (
                                        <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-semibold border border-blue-100">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <p className="mt-2 text-slate-600 flex-1 leading-relaxed">
                                    {service.summary}
                                </p>

                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <span className="inline-flex items-center text-sm text-slate-500">
                                        <svg className="mr-1.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {service.timelineText}
                                    </span>
                                    <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform motion-reduce:transform-none">
                                        Learn more &rarr;
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </AnimatedGridItem>
                ))}
            </AnimatedGrid>

            {services.length === 0 && (
                <div className="text-center text-slate-500 py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No services available at the moment. Please check back later.
                </div>
            )}
        </PageShell>
    )
}

