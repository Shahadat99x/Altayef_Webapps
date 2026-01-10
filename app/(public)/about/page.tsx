import { Metadata } from 'next'
import Link from 'next/link'
import { listTeamMembersPublic } from '@/lib/data/team'
import { listTestimonialsPublic } from '@/lib/data/testimonials'
import { getLicensePublic } from '@/lib/data/license'
import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
// Icons
function ArrowRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    )
}

function CheckCircle({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

function Shield({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    )
}

function Users({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
    )
}

function FileText({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    )
}

function Clock({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

export const metadata: Metadata = {
    title: 'About Us | Altayef Webapps',
    description: 'Learn about Altayef Webapps, a government-approved visa processing agency in Dhaka dedicated to transparency and efficiency.',
}

export default async function AboutPage() {
    const [teamMembers, testimonials, license] = await Promise.all([
        listTeamMembersPublic(),
        listTestimonialsPublic(),
        getLicensePublic()
    ])

    const featuredTeam = teamMembers.slice(0, 4)
    const featuredTestimonials = testimonials.slice(0, 3)

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] rounded-full bg-blue-600/10 blur-3xl p-20" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] rounded-full bg-purple-600/10 blur-3xl p-20" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-12">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        About Altayef
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300 mb-10">
                        We are a government-approved visa processing agency in Dhaka, committed to simplifying your journey with transparency, accuracy, and dedicated support.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                        >
                            Book Consultation
                        </Link>
                        <Link
                            href="/verify-license"
                            className="rounded-full bg-slate-800 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 transition-all flex items-center gap-2"
                        >
                            <Shield className="w-4 h-4" />
                            Verify License
                        </Link>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <Section variant="white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                            Who We Are
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                At Altayef, we understand that visa processing can be complex and overwhelming. That&apos;s why we&apos;ve built our agency on the pillars of <strong>trust, transparency, and efficiency</strong>. Based in Dhaka, we are fully licensed by the government to provide manpower and visa processing services.
                            </p>
                            <p>
                                Our mission is to bridge the gap between talented individuals in Bangladesh and opportunities abroad, specifically in Saudi Arabia and the Gulf region. We take pride in our rigorous process, ensuring every document is verified and every candidate is properly guided.
                            </p>
                            <p>
                                Unlike traditional brokers, we operate with a clear, documented process. You always know where your application stands. We believe in empowering our clients with knowledge, which is why we maintain an extensive Knowledge Center and offer transparent consultations.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-6 border-slate-100 bg-slate-50/50">
                            <Shield className="w-8 h-8 text-blue-600 mb-4" />
                            <h3 className="font-semibold text-slate-900 mb-2">Govt. Approved</h3>
                            <p className="text-sm text-slate-500">Fully licensed agency (RL-{license?.licenseNumber || 'XXXX'})</p>
                        </Card>
                        <Card className="p-6 border-slate-100 bg-slate-50/50 mt-8">
                            <Clock className="w-8 h-8 text-purple-600 mb-4" />
                            <h3 className="font-semibold text-slate-900 mb-2">Fast Processing</h3>
                            <p className="text-sm text-slate-500">Optimized workflows for speed</p>
                        </Card>
                        <Card className="p-6 border-slate-100 bg-slate-50/50">
                            <FileText className="w-8 h-8 text-emerald-600 mb-4" />
                            <h3 className="font-semibold text-slate-900 mb-2">Transparent</h3>
                            <p className="text-sm text-slate-500">Clear documentation & fees</p>
                        </Card>
                        <Card className="p-6 border-slate-100 bg-slate-50/50 mt-8">
                            <Users className="w-8 h-8 text-indigo-600 mb-4" />
                            <h3 className="font-semibold text-slate-900 mb-2">Dedicated Support</h3>
                            <p className="text-sm text-slate-500">We are with you every step</p>
                        </Card>
                    </div>
                </div>
            </Section>

            {/* Why Choose Us */}
            <Section variant="slate">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Why Choose Altayef?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We bring professionalism to an industry that needs it. Here is what sets us apart.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: 'Verified License', desc: 'We operate under a valid Government Recruitment License, ensuring your safety and legal compliance.' },
                        { title: 'No Hidden Costs', desc: 'We provide a clear breakdown of all costs upfront. No surprise fees later in the process.' },
                        { title: 'Document Accuracy', desc: 'Our team meticulously aims for zero errors in documentation to prevent rejections or delays.' },
                        { title: 'Direct Communication', desc: 'You speak directly with our team members, not middlemen. We value direct relationships.' },
                        { title: 'Post-Arrival Support', desc: 'Our care doesn\'t end when you fly. We provide guidance for your arrival and settlement.' },
                        { title: 'Proven Track Record', desc: 'Trusted by thousands of candidates and top employers in the Gulf region.' },
                    ].map((item, index) => (
                        <Card key={index} className="flex gap-4 p-6 hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Team Preview */}
            <Section variant="white">
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-slate-600 max-w-xl text-lg">
                            The dedicated professionals working behind the scenes.
                        </p>
                    </div>
                    <Link href="/about/team" className="flex items-center text-blue-600 hover:text-blue-500 font-semibold group">
                        View All Members <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {featuredTeam.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredTeam.map((member) => (
                            <div key={member._id?.toString()} className="group relative">
                                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100 relative">
                                    {member.photoUrl ? (
                                        <img
                                            src={member.photoUrl}
                                            alt={member.name}
                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-slate-300">
                                            <Users className="w-12 h-12" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="font-bold text-lg">{member.name}</h3>
                                        <p className="text-sm text-slate-200">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12 border-dashed">
                        <Users className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No team members listed</h3>
                        <p className="mt-1 text-sm text-slate-500">Check back soon to meet our team.</p>
                    </Card>
                )}
            </Section>

            {/* Testimonials Preview */}
            <Section variant="slate">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        What Our Clients Say
                    </h2>
                    <Link href="/about/testimonials" className="text-blue-600 hover:text-blue-500 font-semibold inline-flex items-center group">
                        Read All Stories <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {featuredTestimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredTestimonials.map((testimonial) => (
                            <Card key={testimonial._id?.toString()} className="flex flex-col justify-between p-8 h-full">
                                <blockquote className="text-slate-700 mb-6 flex-grow leading-relaxed">
                                    &quot;{testimonial.quote}&quot;
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                        {testimonial.authorPhotoUrl ? (
                                            <img src={testimonial.authorPhotoUrl} alt={testimonial.authorName || 'Client'} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="font-bold text-slate-400">
                                                {(testimonial.authorName || 'C').charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">
                                            {testimonial.anonymized ? 'Verified Client' : testimonial.authorName || 'Verified Client'}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {testimonial.authorRole || 'Candidate'} {testimonial.country ? `• ${testimonial.country}` : ''}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Testimonials coming soon.</p>
                    </div>
                )}
            </Section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                        Ready to start your visa process?
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg leading-8 text-blue-100 mb-10">
                        Join thousands of satisfied clients who have successfully started their careers abroad with Altayef.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
                        >
                            Book Free Consultation
                        </Link>
                        {license?.whatsapp && (
                            <a
                                href={`https://wa.me/${license.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all"
                            >
                                WhatsApp Us
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
