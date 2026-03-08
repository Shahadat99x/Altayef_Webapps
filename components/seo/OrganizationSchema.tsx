'use client'

interface OrganizationSchemaProps {
    organizationName?: string
    licenseNumber?: string
    address?: string
    phone?: string
    email?: string
    website?: string
}

export function OrganizationSchema({
    organizationName = 'Altayef Overseas',
    licenseNumber,
    address = '32, Sultan Ahmed Plaza, (R-607,F-6), Purana Paltan, Dhaka -1000, Bangladesh',
    phone = '+880-2-55112264',
    email = 'altayefoverseas2017@gmail.com',
    website = 'https://www.altayefoverseas.com',
}: OrganizationSchemaProps) {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: organizationName,
        url: website,
        logo: `${website}/brand/logo-lockup.png`,
        email: email,
        telephone: phone,
        address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: 'Dhaka',
            addressRegion: 'Dhaka Division',
            addressCountry: 'BD',
            postalCode: '1000',
        },
        sameAs: [
            'https://www.facebook.com/altayefoverseas',
        ],
    }

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: organizationName,
        image: `${website}/brand/logo-lockup.png`,
        url: website,
        email: email,
        telephone: phone,
        address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: 'Dhaka',
            addressRegion: 'Dhaka Division',
            addressCountry: 'BD',
            postalCode: '1000',
        },
        priceRange: '$$',
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    )
}

interface BreadcrumbItem {
    name: string
    url: string
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
    )
}

interface FAQItem {
    question: string
    answer: string
}

interface FAQSchemaProps {
    faqs: FAQItem[]
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
    )
}
