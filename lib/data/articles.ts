import clientPromise from '../db/mongodb'
import { Article, ArticleSchema } from '../models/schema'
import { ObjectId, Filter, Sort } from 'mongodb'

const DB_NAME = process.env.DB_NAME || 'test'

const getDb = async () => {
    const client = await clientPromise
    return client.db(DB_NAME)
}

export async function listArticlesAdmin({
    category,
    status,
    q,
}: {
    category?: string
    status?: string
    q?: string
}): Promise<Article[]> {
    const db = await getDb()
    const query: Filter<Article> = {}

    if (category && category !== 'all') {
        query.category = category
    }

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
        .collection('articles')
        .find(query)
        .sort({ lastUpdatedAt: -1 })
        .toArray()

    return docs.map(doc => ArticleSchema.parse(doc))
}

export async function getArticleById(id: string): Promise<Article | null> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return null

    const doc = await db.collection('articles').findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return ArticleSchema.parse(doc)
}

export async function getArticleBySlugPublic(category: string, slug: string): Promise<Article | null> {
    const db = await getDb()
    const doc = await db.collection('articles').findOne({
        category,
        slug,
        status: 'published'
    })
    if (!doc) return null
    return ArticleSchema.parse(doc)
}

export async function listArticlesByCategoryPublic(category?: string): Promise<Article[]> {
    const db = await getDb()
    const query: Filter<Article> = { status: 'published' }

    if (category) {
        query.category = category
    }

    const docs = await db.collection('articles')
        .find(query)
        .sort({ lastUpdatedAt: -1 }) // Newest first
        .toArray()

    return docs.map(doc => ArticleSchema.parse(doc))
}

export async function createArticle(data: Omit<Article, '_id' | 'createdAt' | 'updatedAt' | 'lastUpdatedAt'>): Promise<string> {
    const db = await getDb()

    // Ensure slug uniqueness within category
    const existing = await db.collection('articles').findOne({ slug: data.slug, category: data.category })
    let slug = data.slug
    if (existing) {
        slug = `${slug}-${Date.now()}`
    }

    const payload = {
        ...data,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastUpdatedAt: new Date()
    }

    const result = await db.collection('articles').insertOne(payload)
    return result.insertedId.toString()
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false

    const payload = {
        ...data,
        updatedAt: new Date(),
        lastUpdatedAt: new Date() // Always bump content update time
    }
    delete payload._id
    delete payload.createdAt

    const result = await db.collection('articles').updateOne(
        { _id: new ObjectId(id) },
        { $set: payload }
    )
    return result.acknowledged
}

export async function setArticleStatus(id: string, status: 'draft' | 'published' | 'archived'): Promise<boolean> {
    return updateArticle(id, { status })
}

export async function deleteArticle(id: string): Promise<boolean> {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return false
    const result = await db.collection('articles').deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
}
