import Link from 'next/link'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { Service } from '@/lib/models/schema'

export function ServicesPreview({ services }: { services: Service[] }) {
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

            {services.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-slate-500 mb-4">No services currently listed on the homepage.</p>
                    <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                        Contact us for custom inquiries
                    </Link>
                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">{service.title}</h3>

                            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow line-clamp-3 leading-relaxed relative z-10 text-sm">
                                {service.summary}
                            </p>

                            <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto relative z-10">
                                Learn more <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </Link >
                    )) : (
        <div className="col-span-full py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="mb-2">Services are currently being updated.</p>
            <span className="text-sm">Please check back soon.</span>
        </div>
    )
}
                </div >
            </div >
        </section >
    )
}
