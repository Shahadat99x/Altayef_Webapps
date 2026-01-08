'use client'

import { createTestimonialAction, updateTestimonialAction, deleteTestimonialAction } from '@/lib/actions/testimonials'
import { Testimonial } from '@/lib/models/schema'
import { useActionState, useState, ChangeEvent } from 'react'

function ImageUploader({ onUpload, existingUrl }: { onUpload: (url: string) => void, existingUrl?: string }) {
    const [uploading, setUploading] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [preview, setPreview] = useState(existingUrl || '')

    const handleSuccess = (url: string) => {
        onUpload(url)
        setPreview(url)
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
        <div className="bg-gray-50 p-4 rounded border space-y-4">
            {preview && (
                <div className="mb-2">
                    <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-full border" />
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <div className="flex gap-2">
                <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded p-2 text-sm"
                />
                <button type="button" onClick={handleUrlUpload} disabled={uploading || !urlInput} className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">
                    {uploading ? '...' : 'Use URL'}
                </button>
            </div>
        </div>
    )
}

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
    const action = testimonial ? updateTestimonialAction.bind(null, testimonial._id?.toString() || '') : createTestimonialAction
    const [state, dispatch, isPending] = useActionState(action, null)

    return (
        <div className="max-w-2xl mx-auto">
            <form action={dispatch} className="space-y-6 bg-white p-6 rounded shadow">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quote / Review</label>
                        <textarea name="quote" rows={4} defaultValue={testimonial?.quote} className="admin-input" required minLength={10} />
                        {state?.errors?.quote && <p className="text-red-500 text-sm">{state.errors.quote}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Author Name</label>
                            <input name="authorName" defaultValue={testimonial?.authorName} className="admin-input" required minLength={2} />
                            {state?.errors?.authorName && <p className="text-red-500 text-sm">{state.errors.authorName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role (Optional)</label>
                            <input name="authorRole" defaultValue={testimonial?.authorRole || ''} className="admin-input" placeholder="e.g. Founder" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country / Service (Optional)</label>
                        <input name="country" defaultValue={testimonial?.country || ''} className="admin-input" placeholder="e.g. Saudi Visa or Dhaka" />
                    </div>

                    <div>
                        <ImageUploader
                            existingUrl={testimonial?.authorPhotoUrl || ''}
                            onUpload={(url) => {
                                const input = document.querySelector('input[name="authorPhotoUrl"]') as HTMLInputElement
                                if (input) input.value = url
                            }}
                        />
                        <input type="hidden" name="authorPhotoUrl" defaultValue={testimonial?.authorPhotoUrl || ''} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Order</label>
                            <input type="number" name="order" defaultValue={testimonial?.order || 0} className="admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select name="status" defaultValue={testimonial?.status || 'draft'} className="admin-input">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input type="checkbox" name="anonymized" id="anonymized" defaultChecked={testimonial?.anonymized} className="h-4 w-4 text-blue-600 rounded" />
                            <label htmlFor="anonymized" className="ml-2 block text-sm text-gray-900">Anonymize Publicly? (Hide full name/photo)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" name="featured" id="featured" defaultChecked={testimonial?.featured} className="h-4 w-4 text-blue-600 rounded" />
                            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Featured (Show at top?)</label>
                        </div>
                    </div>
                </div>

                {state?.error && <div className="p-4 bg-red-100 text-red-700 rounded">{state.error}</div>}

                <div className="flex justify-end pt-4 border-t">
                    <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
                        {isPending ? 'Saving...' : (testimonial ? 'Update Testimonial' : 'Create Testimonial')}
                    </button>
                </div>
            </form>

            {testimonial && testimonial._id && (
                <div className="mt-8 pt-8 border-t border-red-100">
                    <div className="flex justify-between items-center">
                        <p className="text-red-800 text-sm">Delete this testimonial?</p>
                        <button
                            onClick={async () => {
                                if (confirm('Permanently delete this testimonial?')) {
                                    await deleteTestimonialAction(testimonial._id!.toString())
                                }
                            }}
                            className="text-red-600 hover:text-red-800 text-sm underline"
                        >
                            Delete Permanently
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
