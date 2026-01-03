import clientPromise from '../db/mongodb'
import { Service, ServiceSchema } from '../models/schema'
import { ObjectId, Filter } from 'mongodb'

// Helper to get DB (constants reused)
const DB_NAME = process.env.DB_NAME || 'test'

const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

// Admin Lists
export async function listServicesAdmin({
    q,
    status,
}: {
    q?: string
    status?: string
}): Promise<Service[]> {
    const db = await getDb()
    const query: Filter<Service> = {}

    if (status && status !== 'all') {
        query.status = status
    }

    if (q) {
        query.$or = [
            { title: { $regex: q, $options: 'i' } },
            { slug: { $regex: q, $options: 'i' } },
        ]
    }

    const docs = await db
        .collection('services')
        .find(query)
        .sort({ updatedAt: -1 })
        .toArray()

    // Safe parse (schema might have evolved)
    return docs.map(doc => ServiceSchema.parse(doc))
}

// Get by ID (Admin)
export async function getServiceById(id: string): Promise<Service | null> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return null

    const doc = await db.collection('services').findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return ServiceSchema.parse(doc)
}

// Get by Status (Public)
export async function getServiceBySlugPublic(slug: string): Promise<Service | null> {
    const db = await getDb()
    const doc = await db.collection('services').findOne({ slug, status: 'published' })
    if (!doc) return null
    return ServiceSchema.parse(doc)
}

// Create Service
export async function createService(data: Partial<Service>): Promise<string> {
    const db = await getDb()
    const slug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || ''

    const service = {
        ...data,
        slug,
        // defaults
        status: data.status || 'draft',
        featured: data.featured || false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const validService = ServiceSchema.omit({ _id: true }).parse(service)
    const result = await db.collection('services').insertOne(validService)
    return result.insertedId.toString()
}

// Update Service
export async function updateService(id: string, data: Partial<Service>): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    // Prepare update payload
    const updatePayload: Partial<Service> = {
        ...data,
        updatedAt: new Date()
    }
    delete updatePayload._id // Never update _id

    // Check slug uniqueness if changing? (Skipping complex check for now, unique index will throw)

    // Validate partial (not strictly via Zod parse on whole object since we merge, but ideally we should)
    // For simplicity, relying on runtime or manual validation in action

    const result = await db.collection('services').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatePayload }
    )
    return result.acknowledged
}

// Archive/Delete
export async function setServiceStatus(id: string, status: 'draft' | 'published' | 'archived'): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    const result = await db.collection('services').updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
    )
    return result.modifiedCount > 0
}
