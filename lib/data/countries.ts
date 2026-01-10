import clientPromise from '../db/mongodb'
import { Country, CountrySchema } from '../models/schema'
import { ObjectId, Filter } from 'mongodb'

const DB_NAME = process.env.DB_NAME || 'test'

const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

// Admin List
export async function listCountriesAdmin({
    q,
    status,
}: {
    q?: string
    status?: string
}): Promise<Country[]> {
    const db = await getDb()
    const query: Filter<Country> = {}

    if (status && status !== 'all') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query.status = status as any
    }

    if (q) {
        query.$or = [
            { name: { $regex: q, $options: 'i' } },
            { slug: { $regex: q, $options: 'i' } },
        ]
    }

    const docs = await db
        .collection('countries')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .find(query as any)
        .sort({ updatedAt: -1 })
        .toArray()

    return docs.map(doc => CountrySchema.parse(doc))
}

export async function listCountriesPublic(): Promise<Country[]> {
    const db = await getDb()
    const docs = await db
        .collection('countries')
        .find({ status: 'published' })
        .sort({ featured: -1, name: 1 })
        .toArray()
    return docs.map(doc => CountrySchema.parse(doc))
}

// Get by ID (Admin)
export async function getCountryById(id: string): Promise<Country | null> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return null

    const doc = await db.collection('countries').findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return CountrySchema.parse(doc)
}

// Get by Slug (Public)
export async function getCountryBySlugPublic(slug: string): Promise<Country | null> {
    const db = await getDb()
    const doc = await db.collection('countries').findOne({ slug, status: 'published' })
    if (!doc) return null
    return CountrySchema.parse(doc)
}

// Create
export async function createCountry(data: Partial<Country>): Promise<string> {
    const db = await getDb()
    // Auto-slug if missing
    const slug = data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || ''

    const country = {
        ...data,
        slug,
        status: data.status || 'draft',
        featured: data.featured || false,
        supportedVisaTypes: data.supportedVisaTypes || [],
        requirements: data.requirements || [],
        processSteps: data.processSteps || [],
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const validCountry = CountrySchema.omit({ _id: true }).parse(country)
    const result = await db.collection('countries').insertOne(validCountry)
    return result.insertedId.toString()
}

// Update
export async function updateCountry(id: string, data: Partial<Country>): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    const updatePayload: Partial<Country> = {
        ...data,
        updatedAt: new Date(),
    }
    delete updatePayload._id

    const result = await db.collection('countries').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatePayload }
    )
    return result.acknowledged
}

// Set Status (Archive/Publish)
export async function setCountryStatus(id: string, status: 'draft' | 'published' | 'archived'): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    const result = await db.collection('countries').updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
    )
    return result.modifiedCount > 0
}
