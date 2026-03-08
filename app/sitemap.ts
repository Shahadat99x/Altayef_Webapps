import { MetadataRoute } from 'next'
import { listServicesPublic } from '@/lib/data/services'
import { listCountriesPublic } from '@/lib/data/countries'
import { listArticlesByCategoryPublic } from '@/lib/data/articles'
import { getSiteUrl } from '@/lib/utils/site-url'

// Knowledge center categories
const ARTICLE_CATEGORIES = ['guides', 'process', 'countries', 'legal']

interface SitemapUrl {
    url: string
    lastModified: Date
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority?: number
}

export default async function sitemap(): Promise<SitemapUrl[]> {
    const baseUrl = getSiteUrl()

    // Fetch all dynamic content
    const [services, countries, articlesByCategory] = await Promise.all([
        listServicesPublic(),
        listCountriesPublic(),
        Promise.all(ARTICLE_CATEGORIES.map(cat => listArticlesByCategoryPublic(cat)))
    ])

    // Flatten articles from all categories
    const articles = articlesByCategory.flat()

    // Static pages
    const staticPages: SitemapUrl[] = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/countries`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/knowledge-center`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/verify-license`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Dynamic service pages
    const servicePages: SitemapUrl[] = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic country pages
    const countryPages: SitemapUrl[] = countries.map((country) => ({
        url: `${baseUrl}/countries/${country.slug}`,
        lastModified: country.updatedAt ? new Date(country.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic article pages
    const articlePages: SitemapUrl[] = articles.map((article) => ({
        url: `${baseUrl}/knowledge-center/${article.category}/${article.slug}`,
        lastModified: article.lastUpdatedAt ? new Date(article.lastUpdatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Knowledge center category pages
    const categoryPages: SitemapUrl[] = ARTICLE_CATEGORIES.map((category) => ({
        url: `${baseUrl}/knowledge-center/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        ...staticPages,
        ...servicePages,
        ...countryPages,
        ...categoryPages,
        ...articlePages,
    ]
}
