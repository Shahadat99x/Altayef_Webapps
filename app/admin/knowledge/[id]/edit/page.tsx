import Link from 'next/link'
import ArticleForm from '../../form'
import { getArticleById } from '@/lib/data/articles'
import { notFound } from 'next/navigation'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const article = await getArticleById(id)

    if (!article) notFound()

    const serializedArticle = {
        ...article,
        _id: article._id?.toString()
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Edit Article</h1>
                    <p className="text-gray-500 text-sm mt-1">{article.title}</p>
                </div>
                <Link href="/admin/knowledge" className="text-gray-600 hover:text-gray-900">
                    ← Back to List
                </Link>
            </div>
            <ArticleForm article={serializedArticle} />
        </div>
    )
}
