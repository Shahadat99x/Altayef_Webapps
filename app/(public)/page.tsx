import Link from 'next/link'
import { listServicesAdmin } from '@/lib/data/services'
import { listCountriesAdmin } from '@/lib/data/countries'
import { listArticlesAdmin } from '@/lib/data/articles'
import { listTestimonialsPublic } from '@/lib/data/testimonials'
import { getLicensePublic } from '@/lib/data/license'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Altayef | Government-Approved Visa Processing Agency',
  description: 'Trusted visa processing services in Dhaka. Saudi Arabia work visas, family visas, and more. Government approved license.',
}

export default async function Home() {
  // 1. Data Fetching
  const [
    services,
    countries,
    articles,
    testimonials,
    license
  ] = await Promise.all([
    listServicesAdmin({ status: 'published' }),
    listCountriesAdmin({ status: 'published' }),
    listArticlesAdmin({ status: 'published' }),
    listTestimonialsPublic(),
    getLicensePublic()
  ])

  // 2. Data Preparation
  const featuredServices = services
    .sort((a, b) => (Number(b.featured) - Number(a.featured)))
    .slice(0, 6)

  const featuredCountries = countries
    .sort((a, b) => {
      // Priority 1: Saudi Arabia
      if (a.name.includes('Saudi') && !b.name.includes('Saudi')) return -1;
      if (b.name.includes('Saudi') && !a.name.includes('Saudi')) return 1;
      // Priority 2: Featured
      return (Number(b.featured) - Number(a.featured))
    })
    .slice(0, 6)

  const featuredArticles = articles
    .filter(a => a.featured)
    .slice(0, 3)

  // Fallback if no featured articles, take recent
  const displayArticles = featuredArticles.length > 0 ? featuredArticles : articles.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse-slow"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 mb-6 border border-blue-200 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Government Approved Agency
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Simplified Visa Processing <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-500">Trusted by Thousands</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            We handle the complexities of visa documentation so you can travel with confidence. Expert support for Saudi Arabia and the Middle East.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              Book Free Consultation
            </Link>
            {/* Placeholder for WhatsApp - ideally dynamic from settings */}
            <a
              href="https://wa.me/"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Govt. License Verified
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Fast Processing
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Transparent Fees
            </div>
          </div>
        </div>
      </section>

      {/* 2. License Strip */}
      <section className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-4">
        <div className="container mx-auto px-4 text-center">
          <Link href="/verify-license" className="group inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-xs mr-2 font-mono group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              {license ? `RL-${license.licenseNumber}` : 'LICENSE VERIFIED'}
            </span>
            <span>Click here to verify our official license details</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* 3. Featured Services */}
      <section className="py-20 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Services</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Comprehensive visa and immigration solutions tailored to your specific needs.
              </p>
            </div>
            <Link href="/services" className="text-blue-600 dark:text-blue-400 font-bold hover:underline whitespace-nowrap">
              View All Services &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.length > 0 ? featuredServices.map(service => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {service.summary}
                </p>
                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto">
                  Learn more <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                Services are being updated. Please check back soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Global Destinations (Saudi Highlight) */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Global Network</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We specialize in processing visas for major destinations, with a focus on Saudi Arabia and the Middle East.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCountries.length > 0 ? featuredCountries.map(country => (
              <Link key={country.slug} href={`/countries/${country.slug}`} className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
                  {/* Placeholder for real images */}
                  <div className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${country.name.includes('Saudi') ? 'bg-emerald-900/20' : 'bg-slate-300/20'}`}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{country.name}</h3>
                  <p className="text-slate-200 text-sm line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {country.overview}
                  </p>
                  <div className="mt-4 flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    View Requirements &rarr;
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
                Country list updating...
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/countries" className="inline-flex items-center font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Knowledge Center */}
      <section className="py-20 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">Latest Insights</h2>
            <Link href="/knowledge-center" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Visit Knowledge Center &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayArticles.length > 0 ? displayArticles.map(article => (
              <Link key={article.slug} href={`/knowledge-center/${article.category}/${article.slug}`} className="group bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 relative">
                  {article.coverImageUrl && (
                    <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(article.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                    Read Article
                  </span>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
                Updates coming soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-20 px-4 bg-blue-900 dark:bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map(t => (
              <div key={t._id?.toString()} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
                    {t.anonymized ? 'V' : (t.authorName?.[0] || 'C')}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">{t.anonymized ? 'Verified Client' : t.authorName}</div>
                    <div className="text-xs text-blue-200">{t.country}</div>
                  </div>
                </div>
                <p className="text-blue-50 italic leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
              </div>
            ))}
            {testimonials.length === 0 && (
              <div className="col-span-full text-center text-blue-200 italic">
                Testimonials coming soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Ready to start your visa process?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
            Don&apos;t let paperwork hold you back. Let our experts handle it for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200"
            >
              Book Free Consultation
            </Link>
            <a
              href="https://wa.me/"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
