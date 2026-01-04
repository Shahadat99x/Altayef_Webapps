import clientPromise from '../db/mongodb'
import { License, LicenseSchema } from '../models/schema'

const DB_NAME = process.env.DB_NAME || 'test'

const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

// Singleton Getter (Admin)
// If no record exists, create one as Draft.
export async function getLicenseAdminOrCreateDraft(): Promise<License> {
    const db = await getDb()
    const collection = db.collection('licenses')

    // Check for any document
    const doc = await collection.findOne({})

    if (doc) {
        return LicenseSchema.parse(doc)
    }

    // Initialize Singleton
    const initialLicense: Partial<License> = {
        agencyLegalName: 'Altayef Testing Agency', // Fallback placeholder
        licenseNumber: '',
        issuingAuthority: '',
        officeAddress: '',
        phone: '',
        verificationSteps: [],
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    // Zod parse omit ID for pure data check, though schema requires some fields we just defaulted
    const result = await collection.insertOne(initialLicense)
    return LicenseSchema.parse({ ...initialLicense, _id: result.insertedId })
}

// Update Singleton
export async function updateLicense(data: Partial<License>): Promise<boolean> {
    const db = await getDb()
    const collection = db.collection('licenses')

    // Find the one doc
    const existing = await collection.findOne({})
    if (!existing) return false // Should utilize get-or-create flow first ideally

    const updatePayload: Partial<License> = {
        ...data,
        updatedAt: new Date()
    }
    delete updatePayload._id

    const result = await collection.updateOne(
        { _id: existing._id },
        { $set: updatePayload }
    )
    return result.acknowledged
}

// Public Getter
export async function getLicensePublic(): Promise<License | null> {
    const db = await getDb()
    const doc = await db.collection('licenses').findOne({ status: 'published' })
    if (!doc) return null
    return LicenseSchema.parse(doc)
}
