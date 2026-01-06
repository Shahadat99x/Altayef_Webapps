import Link from 'next/link'
import ArticleForm from '../form'

export default function NewArticlePage() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Add New Article</h1>
                <Link href="/admin/knowledge" className="text-gray-600 hover:text-gray-900">
                    ← Back to List
                </Link>
            </div>
            <ArticleForm />
        </div>
    )
}
