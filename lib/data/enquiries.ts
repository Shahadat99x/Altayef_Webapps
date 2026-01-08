import clientPromise from '../db/mongodb'
import { Enquiry, EnquirySchema } from '../models/schema'
import { ObjectId, Filter } from 'mongodb'

const DB_NAME = process.env.DB_NAME || 'test'

const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

// Public: Create Enquiry
export async function createPublicEnquiry(data: Partial<Enquiry>): Promise<string> {
    const db = await getDb()

    // Auto-fields
    const enquiry = {
        ...data,
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    // Basic runtime cleaning (if schema doesn't match perfectly before parsing)
    if (data.countryId) enquiry.countryId = new ObjectId(data.countryId)
    if (data.interestedServiceId) enquiry.interestedServiceId = new ObjectId(data.interestedServiceId)

    const validEnquiry = EnquirySchema.omit({ _id: true }).parse(enquiry)
    const result = await db.collection('enquiries').insertOne(validEnquiry)
    return result.insertedId.toString()
}

// Admin: List Enquiries
export async function listEnquiriesAdmin(status?: string): Promise<Enquiry[]> {
    const db = await getDb()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {} // Using any to bypass strict Zod/MongoDB filter mismatches for now

    if (status && status !== 'all') {
        query.status = status
    }

    const docs = await db
        .collection('enquiries')
        .find(query)
        .sort({ createdAt: -1 })
        .toArray()

    return docs.map(doc => EnquirySchema.parse(doc))
}

// Admin: Get by ID
export async function getEnquiryById(id: string): Promise<Enquiry | null> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return null

    const doc = await db.collection('enquiries').findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return EnquirySchema.parse(doc)
}

// Admin: Update Status/Notes
export async function updateEnquiry(id: string, data: Partial<Enquiry>): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    const updatePayload: Partial<Enquiry> = {
        ...data,
        updatedAt: new Date()
    }
    delete updatePayload._id
    delete updatePayload.createdAt

    // Ensure ObjectIds if present
    if (data.countryId) updatePayload.countryId = typeof data.countryId === 'string' ? new ObjectId(data.countryId) : data.countryId
    if (data.interestedServiceId) updatePayload.interestedServiceId = typeof data.interestedServiceId === 'string' ? new ObjectId(data.interestedServiceId) : data.interestedServiceId

    const result = await db.collection('enquiries').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatePayload }
    )
    return result.acknowledged
}
