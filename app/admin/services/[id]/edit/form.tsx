'use client'

import { updateServiceAction } from '@/lib/actions/services'
import { Service } from '@/lib/models/schema'
import { useActionState } from 'react'

export default function EditServiceForm({ service }: { service: Service }) {
    const updateActionWithId = updateServiceAction.bind(null, service._id?.toString() || '')
    const [state, dispatch, isPending] = useActionState(updateActionWithId, null)

    return (
        <form action={dispatch} className="space-y-6 bg-white p-6 rounded shadow">

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input name="title" type="text" defaultValue={service.title} className="mt-1 block w-full border border-gray-300 rounded md p-2" required />
                {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
            </div>

            {/* Slug (Optional) */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Slug (Auto-generated if empty)</label>
                <input name="slug" type="text" defaultValue={service.slug} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
            </div>

            {/* Summary */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Summary (Short)</label>
                <textarea name="summary" rows={3} defaultValue={service.summary} className="mt-1 block w-full border border-gray-300 rounded md p-2" required />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Content (Markdown/HTML)</label>
                <textarea name="content" rows={10} defaultValue={service.content} className="mt-1 block w-full border border-gray-300 rounded md p-2" required />
            </div>

            {/* Requirements */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Requirements (One per line)</label>
                <textarea name="requirements" rows={5} defaultValue={service.requirements.join('\n')} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
            </div>

            {/* Timeline */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Timeline Text</label>
                <input name="timelineText" type="text" defaultValue={service.timelineText} className="mt-1 block w-full border border-gray-300 rounded md p-2" placeholder="e.g. 2-3 weeks" required />
            </div>

            {/* Featured */}
            <div className="flex items-center">
                <input name="featured" type="checkbox" defaultChecked={service.featured} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">Featured Service</label>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" defaultValue={service.status} className="mt-1 block w-full border border-gray-300 rounded md p-2">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            {/* SEO */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                        <input name="seoTitle" type="text" defaultValue={service.seo?.title} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                        <textarea name="seoDescription" rows={3} defaultValue={service.seo?.description} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
                    </div>
                </div>
            </div>

            {state?.error && <p className="text-red-500">{state.error}</p>}

            <div className="flex justify-end">
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
                    {isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
}
