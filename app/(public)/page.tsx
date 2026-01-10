import Link from 'next/link'
import { HeroSection } from '@/components/home/HeroSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { DestinationsPreview } from '@/components/home/DestinationsPreview'
import { TestimonialsPreview } from '@/components/home/TestimonialsPreview'
import { InsightsPreview } from '@/components/home/InsightsPreview'
import { CtaBand } from '@/components/home/CtaBand'
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
      <HeroSection license={license} />
      <HowItWorks />
      <ServicesPreview services={featuredServices} />
      <DestinationsPreview countries={featuredCountries} />
      <TestimonialsPreview testimonials={testimonials} />
      <InsightsPreview articles={displayArticles} />
      <CtaBand />
    </div>
  )
}
