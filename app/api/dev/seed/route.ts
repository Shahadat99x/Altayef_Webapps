import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db/mongodb'
// we don't have uuid installed, we can just use random strings or install uuid.
// Standard library doesn't have uuid. We'll use a simple helper or just hardcode slugs.

// Helper to check permission
const checkPermission = (req: Request) => {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const envToken = process.env.SEED_TOKEN
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) return true // Always allow in dev
  if (envToken && token === envToken) return true
  return false
}

export async function POST(req: Request) {
  if (!checkPermission(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.DB_NAME || 'test')

    // 1. Services
    const serviceCount = await db.collection('services').countDocuments()
    if (serviceCount === 0) {
      await db.collection('services').insertMany([
        {
          title: 'Work Visa Processing',
          slug: 'work-visa-processing',
          summary:
            'Efficient processing for work permits in Saudi Arabia and Malaysia.',
          details: '<p>Full service processing...</p>',
          requirements: ['Passport', 'Photo', 'Medical Report'],
          timelineText: '2-3 weeks',
          seo: {
            title: 'Work Visa - Altayef',
            description: 'Get your work visa fast.',
          },
          status: 'published',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Student Visa Assistance',
          slug: 'student-visa-assistance',
          summary: 'Guidance for students applying to universities abroad.',
          details: '<p>Comprehensive support...</p>',
          requirements: ['Admission Letter', 'Financial Proof'],
          timelineText: '1-2 months',
          seo: {
            title: 'Student Visa - Altayef',
            description: 'Study abroad with ease.',
          },
          status: 'published',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    }

    // 2. Countries
    const countryCount = await db.collection('countries').countDocuments()
    if (countryCount === 0) {
      await db.collection('countries').insertMany([
        {
          name: 'Saudi Arabia',
          slug: 'saudi-arabia',
          overview: 'Kingdom of opportunities.',
          visaTypes: ['Work', 'Hajj/Umrah', 'Visit'],
          requirements: ['Passport', 'Vaccination'],
          timelineText: 'Variable',
          seo: {
            title: 'Saudi Arabia Visa',
            description: 'Visa services for KSA.',
          },
          status: 'published',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    }

    // 3. Site Settings (Singleton)
    const settingsCount = await db.collection('siteSettings').countDocuments()
    if (settingsCount === 0) {
      await db.collection('siteSettings').insertOne({
        siteName: 'Altayef Webapps',
        phone: '+880123456789',
        whatsapp: '+880123456789',
        address: 'Dhaka, Bangladesh',
        socialLinks: { facebook: 'https://fb.com/altayef' },
        primaryCTA: '/contact',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // Create Indexes
    await db.collection('services').createIndex({ slug: 1 }, { unique: true })
    await db.collection('countries').createIndex({ slug: 1 }, { unique: true })
    await db.collection('articles').createIndex({ slug: 1 }, { unique: true })

    return NextResponse.json({
      ok: true,
      message: 'Database seeded successfully',
    })
  } catch (error) {
    console.error('Seeding failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Seeding failed' },
      { status: 500 }
    )
  }
}
