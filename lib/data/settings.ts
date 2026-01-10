import clientPromise from '@/lib/db/mongodb'
import { SiteSettings, SiteSettingsSchema } from '@/lib/models/schema'

const DB_NAME = process.env.DB_NAME || 'altayef_db'
const COLLECTION = 'siteSettings'
const SETTINGS_ID = 'global_settings' // Singleton ID

export async function getSiteSettings(): Promise<SiteSettings | null> {
    const client = await clientPromise
    const db = client.db(DB_NAME)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = await db.collection(COLLECTION).findOne({ _id: SETTINGS_ID as any })

    if (!settings) return null

    return settings as unknown as SiteSettings
}

export async function upsertSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const client = await clientPromise
    const db = client.db(DB_NAME)

    // Validate partial data against schema (stripping _id and dates for update)
    const validationResult = SiteSettingsSchema.partial().safeParse(data)

    if (!validationResult.success) {
        throw new Error('Invalid settings data: ' + JSON.stringify(validationResult.error.format()))
    }

    const validData = validationResult.data

    const now = new Date()

    const updateDoc = {
        $set: {
            ...validData,
            updatedAt: now,
        },
        $setOnInsert: {
            _id: SETTINGS_ID,
            createdAt: now,
        }
    }

    const result = await db.collection(COLLECTION).findOneAndUpdate(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { _id: SETTINGS_ID as any },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateDoc as any,
        { upsert: true, returnDocument: 'after' }
    )

    if (!result) {
        throw new Error('Failed to upsert settings')
    }

    return result as unknown as SiteSettings
}
