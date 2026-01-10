import { listServicesPublic } from '@/lib/data/services'
import { listCountriesPublic } from '@/lib/data/countries'
import ContactForm from '@/components/contact/contact-form'
import { Metadata } from 'next'

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
        <>
            {/* Hero Section */}
            <div className="bg-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">Let&apos;s Discuss Your Visa Needs</h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Visit our office in Dhaka or start a conversation online. We are here to simplify your documentation process.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://wa.me/8801234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-600 transition shadow-lg"
                        >
                            <span>WhatsApp Us Now</span>
                        </a>
                        <a
                            href="tel:+8801234567890"
                            className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
                        >
                            <span>Call +880 1234-567890</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Contact Info & Map */}
                    <div className="space-y-12">
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-300 mb-2">Office Address</h3>
                                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                                    Level 5, Sample Plaza,<br />
                                    Gulshan Avenue, Dhaka-1212,<br />
                                    Bangladesh
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800">
                                <h3 className="font-bold text-lg text-green-900 dark:text-green-300 mb-2">Quick Contact</h3>
                                <p className="text-green-800 dark:text-green-200 space-y-1">
                                    <span className="block"><strong>Mobile:</strong> +880 1234-567890</span>
                                    <span className="block"><strong>Email:</strong> info@altayef.com</span>
                                </p>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="h-80 bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-slate-700 relative">
                            {/* Placeholder for map if no URL provided in settings later */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.846522567995!2d90.41014131543156!3d23.75085808458913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8627b0b691b%3A0xc38ba514a6016e3!2sGulshan%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1650000000000!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div className="absolute inset-x-0 bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 text-center text-xs text-gray-500 dark:text-gray-400">
                                Map showing approximate location in Gulshan, Dhaka.
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send an Enquiry</h2>
                            <p className="text-gray-500 dark:text-slate-400 mt-2">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <ContactForm services={services} countries={countries} />
                    </div>
                </div>
            </div>
        </>
    )
}
