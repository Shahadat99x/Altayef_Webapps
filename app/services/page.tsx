import { listServicesAdmin } from '@/lib/data/services'
import Link from 'next/link'

export const metadata = {
    title: 'Our Services | Altayef',
    description: 'Professional visa processing and immigration services in Dhaka.',
}

export default async function ServicesPage() {
    // Reuse admin list function but filter for published.
    // Ideally we should have a public specific list function if logic diverges, 
    // but listServicesAdmin({ status: 'published' }) works perfectly and is secure (server-side).
    const services = await listServicesAdmin({ status: 'published' })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Services</h1>
                <p className="mt-4 text-xl text-gray-500">
                    Comprehensive visa and immigration solutions tailored to your needs.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
                                {service.featured && (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">Featured</span>
                                )}
                            </div>
                            <p className="mt-2 text-base text-gray-500 flex-1">
                                {service.summary}
                            </p>
                            <div className="mt-4 flex items-center text-sm text-gray-500">
                                <svg className="mr-1.5 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {service.timelineText}
                            </div>
                            <div className="mt-6">
                                <span className="text-blue-600 font-medium hover:text-blue-500">
                                    Learn more &rarr;
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {services.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    No services available at the moment. Please check back later.
                </div>
            )}
        </div>
    )
}
