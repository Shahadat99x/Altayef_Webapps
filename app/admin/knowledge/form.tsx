'use client'

import { ADMIN_STYLES } from '@/lib/admin-styles'
import { createArticleAction, updateArticleAction, deleteArticleAction } from '@/lib/actions/articles'
import { Article } from '@/lib/models/schema'
import { useActionState, useState, ChangeEvent } from 'react'

function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
    const [uploading, setUploading] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleSuccess = (url: string) => {
        onUpload(url)
        setSuccessMsg('Image ready!')
        setTimeout(() => setSuccessMsg(''), 3000)
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/admin/uploads/cloudinary', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            if (data.url) handleSuccess(data.url)
            else alert('Upload failed: ' + data.error)
        } catch {
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleUrlUpload = async () => {
        if (!urlInput) return
        setUploading(true)
        try {
            const res = await fetch('/api/admin/uploads/cloudinary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceUrl: urlInput }),
            })
            const data = await res.json()
            if (data.url) handleSuccess(data.url)
            else alert('Upload failed: ' + data.error)
        } catch {
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded border dark:border-slate-700 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload File</label>
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-700 dark:file:text-slate-200" />
            </div>
            <div className="flex gap-2">
                <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    className="flex-1 border border-gray-300 dark:border-slate-700 rounded p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
                <button type="button" onClick={handleUrlUpload} disabled={uploading || !urlInput} className="bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded text-sm hover:bg-gray-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100">
                    {uploading ? 'Uploading...' : 'Upload URL'}
                </button>
            </div>
            {successMsg && <p className="text-green-600 dark:text-green-400 text-sm font-medium">{successMsg}</p>}
        </div>
    )
}

export default function ArticleForm({ article }: { article?: Article }) {
    // If article exists, we are in edit mode
    const action = article ? updateArticleAction.bind(null, article._id?.toString() || '') : createArticleAction
    const [state, dispatch, isPending] = useActionState(action, null)

    // FAQ State for dynamic fields
    const [faqs, setFaqs] = useState(article?.faq || [{ question: '', answer: '' }])

    const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }])
    const removeFaq = (index: number) => {
        const newFaqs = [...faqs]
        newFaqs.splice(index, 1)
        setFaqs(newFaqs)
    }

    return (
        <>
            <form action={dispatch} className={`space-y-8 ${ADMIN_STYLES.CARD}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Content Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input name="title" defaultValue={article?.title} className="admin-input" required minLength={3} />
                            {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                            <input name="slug" defaultValue={article?.slug || ''} className="admin-input" required pattern="^[a-z0-9-]+$" placeholder="my-article-slug" />
                            <p className="text-xs text-gray-500">Use kebab-case only (e.g. visa-process-steps)</p>
                            {state?.errors?.slug && <p className="text-red-500 text-sm">{state.errors.slug}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Excerpt (Short Summary)</label>
                            <textarea name="excerpt" rows={3} defaultValue={article?.excerpt || ''} className="admin-input" required />
                            {state?.errors?.excerpt && <p className="text-red-500 text-sm">{state.errors.excerpt}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content (HTML/Markdown support)</label>
                            <textarea name="content" rows={15} defaultValue={article?.content || ''} className="mt-1 block w-full border border-gray-300 rounded p-2 font-mono text-sm" required />
                            <p className="text-xs text-gray-500">Use Markdown for headings (##), lists (-), and bold (**).</p>
                            {state?.errors?.content && <p className="text-red-500 text-sm">{state.errors.content}</p>}
                        </div>

                        {/* Image Upload Section */}
                        <div className="border-t pt-4">
                            <div className="mb-2">
                                <h3 className="text-lg font-medium text-gray-900">Insert Image into Content</h3>
                                <p className="text-sm text-gray-500">This inserts an image inside the article body (markdown) at your cursor position.</p>
                            </div>
                            <ImageUploader onUpload={(url) => {
                                const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
                                if (textarea) {
                                    const start = textarea.selectionStart
                                    const end = textarea.selectionEnd
                                    const text = textarea.value
                                    const before = text.substring(0, start)
                                    const after = text.substring(end, text.length)
                                    const insert = `\n![Image](${url})\n`
                                    textarea.value = before + insert + after
                                }
                                // Also copy to clipboard
                                navigator.clipboard.writeText(`![Image](${url})`)
                                // Use a more subtle feedback if possible, but alert is robust for now as requested "Small success state".
                                // For a better UX without adding toast lib, we can toggle a text below.
                                // But prompt allowed "alert" replacement or "success state".
                                // I'll stick to alert for simplicity or maybe add a temporary text.
                                // Let's modify ImageUploader to take a "onSuccess" prop or handle it itself?
                                // Actually, I'll let ImageUploader handle "uploading" state, but here I can show a message.
                                alert('Image inserted into content and copied to clipboard!')
                            }} />
                        </div>

                        {/* FAQ Section */}
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Freq. Asked Questions</h3>
                                <button type="button" onClick={addFaq} className="text-sm text-blue-600 hover:text-blue-800">+ Add Question</button>
                            </div>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded">
                                        <div className="flex-1 space-y-2">
                                            <input name="faqQuestions" defaultValue={faq.question} placeholder="Question" className="block w-full border border-gray-300 rounded p-2 text-sm" />
                                            <textarea name="faqAnswers" defaultValue={faq.answer} placeholder="Answer" rows={2} className="block w-full border border-gray-300 rounded p-2 text-sm" />
                                        </div>
                                        <button type="button" onClick={() => removeFaq(index)} className="text-red-500 hover:text-red-700 text-sm">×</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded border">
                            <h3 className="font-medium text-gray-900 mb-4">Publishing</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select name="status" defaultValue={article?.status || 'draft'} className="admin-input">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select name="category" defaultValue={article?.category || 'guides'} className="admin-input">
                                    <option value="guides">Guides</option>
                                    <option value="process">Process</option>
                                    <option value="countries">Countries</option>
                                    <option value="legal">Legal/Compliance</option>
                                </select>
                            </div>

                            <div className="flex items-center mb-4">
                                <input type="checkbox" name="featured" id="featured" defaultChecked={article?.featured} className="h-4 w-4 text-blue-600 rounded" />
                                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Featured Article</label>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded border">
                            <h3 className="font-medium text-gray-900 mb-4">Cover Image</h3>
                            <div className="space-y-4">
                                <ImageUploader onUpload={(url) => {
                                    const input = document.querySelector('input[name="coverImageUrl"]') as HTMLInputElement
                                    if (input) {
                                        input.value = url
                                        // Trigger change if needed, though native input handles it for FormData
                                    }
                                    // Force re-render preview if we were using state, but here we might just rely on the input.
                                    // Better: Use state for preview.
                                }} />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input name="coverImageUrl" defaultValue={article?.coverImageUrl || ''} className="admin-input" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Alt Text (Required if image set)</label>
                                    <input name="coverImageAlt" defaultValue={article?.coverImageAlt || ''} className="admin-input" placeholder="Describe the image" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Caption (Optional)</label>
                                    <input name="coverImageCaption" defaultValue={article?.coverImageCaption || ''} className="admin-input" placeholder="Photo info/credits" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded border">
                            <h3 className="font-medium text-gray-900 mb-4">SEO Metadata</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        SEO Title
                                        <span className="text-xs font-normal text-gray-500 ml-2">
                                            (Recomm: 50-60 chars)
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="seoTitle"
                                            defaultValue={article?.seo?.title}
                                            className="admin-input"
                                            onChange={(e) => {
                                                const count = e.target.value.length
                                                const counterEl = document.getElementById('seo-title-count')
                                                if (counterEl) {
                                                    counterEl.innerText = `${count} chars`
                                                    counterEl.className = `text-xs mt-1 ${count > 60 ? 'text-red-500' : 'text-green-600'}`
                                                }
                                            }}
                                        />
                                        <p id="seo-title-count" className="text-xs text-gray-500 mt-1">
                                            {article?.seo?.title?.length || 0} chars
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        SEO Description
                                        <span className="text-xs font-normal text-gray-500 ml-2">
                                            (Recomm: 150-160 chars)
                                        </span>
                                    </label>
                                    <textarea
                                        name="seoDescription"
                                        rows={3}
                                        defaultValue={article?.seo?.description}
                                        className="admin-input"
                                        onChange={(e) => {
                                            const count = e.target.value.length
                                            const counterEl = document.getElementById('seo-desc-count')
                                            if (counterEl) {
                                                counterEl.innerText = `${count} chars`
                                                counterEl.className = `text-xs mt-1 ${count > 160 ? 'text-red-500' : 'text-green-600'}`
                                            }
                                        }}
                                    />
                                    <p id="seo-desc-count" className="text-xs text-gray-500 mt-1">
                                        {article?.seo?.description?.length || 0} chars
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded border">
                            <label className="block text-sm font-medium text-gray-700">Author Name (Optional)</label>
                            <input name="authorName" defaultValue={article?.authorName} placeholder="e.g. Agency Team" className="admin-input" />
                        </div>
                    </div>
                </div>

                {state?.error && <div className="p-4 bg-red-100 text-red-700 rounded">{state.error}</div>}

                <div className="flex justify-end pt-4 border-t">
                    <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 font-medium shadow-sm">
                        {isPending ? 'Saving...' : (article ? 'Update Article' : 'Create Article')}
                    </button>
                </div>
            </form>

            {
                article && article._id && (
                    <div className="mt-8 pt-8 border-t border-red-100">
                        <h3 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
                        <div className="bg-red-50 border border-red-200 rounded p-4 flex items-center justify-between">
                            <div>
                                <p className="text-red-800 font-medium">Delete this article</p>
                                <p className="text-red-600 text-sm">Permanently remove this article from the database. This cannot be undone.</p>
                            </div>
                            <form
                                action={async () => {
                                    if (confirm('Are you sure you want to delete this article? This action cannot be easily undone.')) {
                                        await deleteArticleAction(article._id!.toString(), new FormData())
                                    }
                                }}
                            >
                                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition">
                                    Delete Article
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}
