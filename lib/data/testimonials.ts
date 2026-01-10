import clientPromise from '../db/mongodb'
import { Testimonial, TestimonialSchema } from '../models/schema'
import { ObjectId, Filter } from 'mongodb'

const DB_NAME = process.env.DB_NAME || 'test'

const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

export async function listTestimonialsAdmin(status?: string): Promise<Testimonial[]> {
    const db = await getDb()
    const query: Filter<Testimonial> = {}

    if (status && status !== 'all') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query.status = status as any
    }

    const docs = await db
        .collection('testimonials')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .find(query as any)
        .sort({ order: 1, updatedAt: -1 })
        .toArray()

    return docs.map(doc => TestimonialSchema.parse(doc))
}

export async function listTestimonialsPublic(): Promise<Testimonial[]> {
    const db = await getDb()
    const docs = await db
        .collection('testimonials')
        .find({ status: 'published' })
        .sort({ featured: -1, order: 1, updatedAt: -1 })
        .toArray()

    return docs.map(doc => TestimonialSchema.parse(doc))
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return null

    const doc = await db.collection('testimonials').findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return TestimonialSchema.parse(doc)
}

export async function createTestimonial(data: Omit<Testimonial, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const db = await getDb()
    const payload = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const result = await db.collection('testimonials').insertOne(payload)
    return result.insertedId.toString()
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    const payload = {
        ...data,
        updatedAt: new Date()
    }
    delete payload._id
    delete payload.createdAt

    const result = await db.collection('testimonials').updateOne(
        { _id: new ObjectId(id) },
        { $set: payload }
    )
    return result.acknowledged
}

export async function deleteTestimonial(id: string): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false
    const result = await db.collection('testimonials').deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
}
