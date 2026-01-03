import clientPromise from '../db/mongodb'
import {
    Service,
    ServiceSchema,
    Country,
    CountrySchema,
    Article,
    ArticleSchema,
    TeamMember,
    TeamMemberSchema,
    Testimonial,
    TestimonialSchema,
    License,
    LicenseSchema,
    Enquiry,
    EnquirySchema,
    SiteSettings,
    SiteSettingsSchema,
} from '../models/schema'


// --- Constants ---
const DB_NAME = process.env.DB_NAME || 'test'

// --- Helpers ---
const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

// --- Services ---
export async function listPublishedServices(): Promise<Service[]> {
    const db = await getDb()
    const docs = await db
        .collection('services')
        .find({ status: 'published' })
        .toArray()
    return docs.map((doc) => ServiceSchema.parse(doc))
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    const db = await getDb()
    const doc = await db
        .collection('services')
        .findOne({ slug, status: 'published' })
    if (!doc) return null
    return ServiceSchema.parse(doc)
}

// --- Countries ---
export async function listPublishedCountries(): Promise<Country[]> {
    const db = await getDb()
    const docs = await db
        .collection('countries')
        .find({ status: 'published' })
        .toArray()
    return docs.map((doc) => CountrySchema.parse(doc))
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
    const db = await getDb()
    const doc = await db
        .collection('countries')
        .findOne({ slug, status: 'published' })
    if (!doc) return null
    return CountrySchema.parse(doc)
}

// --- Articles ---
export async function listArticlesByCategory(
    category?: string
): Promise<Article[]> {
    const db = await getDb()
    const query = { status: 'published', ...(category ? { category } : {}) }
    const docs = await db
        .collection('articles')
        .find(query)
        .sort({ lastUpdatedAt: -1 })
        .toArray()
    return docs.map((doc) => ArticleSchema.parse(doc))
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const db = await getDb()
    const doc = await db
        .collection('articles')
        .findOne({ slug, status: 'published' })
    if (!doc) return null
    return ArticleSchema.parse(doc)
}

// --- Team ---
export async function listTeamMembers(): Promise<TeamMember[]> {
    const db = await getDb()
    const docs = await db
        .collection('teamMembers')
        .find({ active: true })
        .sort({ order: 1 })
        .toArray()
    return docs.map((doc) => TeamMemberSchema.parse(doc))
}

// --- Testimonials ---
export async function listFeaturedTestimonials(): Promise<Testimonial[]> {
    const db = await getDb()
    const docs = await db
        .collection('testimonials')
        .find({ status: 'published', featured: true })
        .sort({ date: -1 })
        .toArray()
    return docs.map((doc) => TestimonialSchema.parse(doc))
}

// --- License ---
export async function getLicenseInfo(): Promise<License[]> {
    const db = await getDb()
    const docs = await db
        .collection('licenses')
        .find({ status: 'published' })
        .toArray()
    return docs.map((doc) => LicenseSchema.parse(doc))
}

// --- Enquiries ---
export async function createEnquiry(data: Partial<Enquiry>): Promise<string> {
    const db = await getDb()
    const enquiry = {
        ...data,
        status: 'new',
        notes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    // Validate before inserting (will throw if invalid)
    const validEnquiry = EnquirySchema.omit({ _id: true }).parse(enquiry)

    const result = await db.collection('enquiries').insertOne(validEnquiry)
    return result.insertedId.toString()
}

// --- Site Settings ---
export async function getSiteSettings(): Promise<SiteSettings | null> {
    const db = await getDb()
    const doc = await db.collection('siteSettings').findOne({})
    if (!doc) return null
    return SiteSettingsSchema.parse(doc)
}
