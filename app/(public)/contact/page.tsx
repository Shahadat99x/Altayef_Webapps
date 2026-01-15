import { listServicesPublic } from '@/lib/data/services'
import { listCountriesPublic } from '@/lib/data/countries'
import ContactForm from '@/components/contact/contact-form'
import { Metadata } from 'next'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'
import { AnimatedSection } from '@/components/motion'

export const metadata: Metadata = {
    title: 'Contact Us | Altayef',
    description: 'Get in touch with Altayef for expert visa assistance. Visit our Dhaka office or contact us via WhatsApp/Phone.',
}

export default async function ContactPage() {
    // Parallel data fetching
    const [services, countries] = await Promise.all([
        listServicesPublic(),
        listCountriesPublic()
    ])

    return (
        <PageShell
            title="Let's Discuss Your Visa Needs"
            description="Visit our office in Dhaka or start a conversation online. We are here to simplify your documentation process."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                {/* Left Column: Contact Info & Map */}
                <AnimatedSection delay={0}>
                    <div className="space-y-8">
                        {/* Quick Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://wa.me/+8801820049265"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 motion-reduce:transform-none"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.215-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                <span>WhatsApp Us</span>
                            </a>
                            <a
                                href="tel:02-55112264"
                                className="flex-1 inline-flex items-center justify-center gap-3 bg-white text-slate-700 border border-slate-200 px-6 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition shadow-sm hover:shadow-md transform hover:-translate-y-0.5 motion-reduce:transform-none"
                            >
                                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span>Call Us</span>
                            </a>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Card className="p-6 bg-blue-50 border-blue-100 flex flex-col h-full">
                                <h3 className="font-bold text-lg text-blue-900 mb-2">Office Address</h3>
                                <p className="text-blue-800 leading-relaxed text-sm flex-1">
                                    32, Sultan Ahmed Plaza,<br />
                                    (R-607,F-6), Purana Paltan<br />
                                    Dhaka -1000
                                </p>
                            </Card>
                            <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col h-full">
                                <h3 className="font-bold text-lg text-slate-900 mb-2">Quick Contact</h3>
                                <div className="text-slate-600 space-y-2 text-sm">
                                    <p className="flex items-center">
                                        <span className="font-medium text-slate-900 w-16">Mobile:</span> 02-55112264
                                    </p>
                                    <p className="flex items-center">
                                        <span className="font-medium text-slate-900 w-16">Email:</span> altayefoverseas2017@gmail.com
                                    </p>
                                </div>
                            </Card>
                        </div>

                        {/* Map Embed */}
                        <Card className="h-80 overflow-hidden relative p-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.4444923336514!2d90.40874121147137!3d23.731523778594543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9f24a9d677b%3A0x7d82a5ac10bd026c!2sAl%20Tayef%20Overseas%20Ltd.!5e0!3m2!1sen!2slt!4v1768519732111!5m2!1sen!2slt"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm px-4 py-2 text-center text-xs text-slate-500 border-t border-slate-200">
                                Al Tayef Overseas Ltd. - Purana Paltan, Dhaka
                            </div>
                        </Card>
                    </div>
                </AnimatedSection>

                {/* Right Column: Form */}
                <AnimatedSection delay={0.15}>
                    <Card className="p-8 md:p-10 shadow-xl border-slate-200">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Send an Enquiry</h2>
                            <p className="text-slate-500 mt-2">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <ContactForm services={services} countries={countries} />
                    </Card>
                </AnimatedSection>
            </div>
        </PageShell>
    )
}

