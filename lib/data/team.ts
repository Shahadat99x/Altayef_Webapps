import clientPromise from '../db/mongodb'
import { TeamMember, TeamMemberSchema } from '../models/schema'
import { ObjectId, Filter } from 'mongodb'

const DB_NAME = process.env.DB_NAME || 'test'

const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

export async function listTeamMembersAdmin(status?: string): Promise<TeamMember[]> {
    const db = await getDb()
    const query: Filter<TeamMember> = {}

    if (status && status !== 'all') {
        query.status = status
    }

    const docs = await db
        .collection('teamMembers')
        .find(query)
        .sort({ order: 1, updatedAt: -1 })
        .toArray()

    return docs.map(doc => TeamMemberSchema.parse(doc))
}

export async function listTeamMembersPublic(): Promise<TeamMember[]> {
    const db = await getDb()
    const docs = await db
        .collection('teamMembers')
        .find({ status: 'published' })
        .sort({ featured: -1, order: 1, updatedAt: -1 })
        .toArray()

    return docs.map(doc => TeamMemberSchema.parse(doc))
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return null

    const doc = await db.collection('teamMembers').findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return TeamMemberSchema.parse(doc)
}

export async function createTeamMember(data: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const db = await getDb()
    const payload = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const result = await db.collection('teamMembers').insertOne(payload)
    return result.insertedId.toString()
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    const payload = {
        ...data,
        updatedAt: new Date()
    }
    delete payload._id
    delete payload.createdAt

    const result = await db.collection('teamMembers').updateOne(
        { _id: new ObjectId(id) },
        { $set: payload }
    )
    return result.acknowledged
}

export async function deleteTeamMember(id: string): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false
    const result = await db.collection('teamMembers').deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
}
