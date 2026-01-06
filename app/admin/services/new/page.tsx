'use client'

import { createServiceAction } from '@/lib/actions/services'
import { useActionState } from 'react'

export default function NewServicePage() {
    const [state, dispatch, isPending] = useActionState(createServiceAction, null)

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Service</h1>
            <form action={dispatch} className="space-y-6 bg-white p-6 rounded shadow">

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input name="title" type="text" className="admin-input" required />
                    {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
                </div>

                {/* Slug (Optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug (Auto-generated if empty)</label>
                    <input name="slug" type="text" className="admin-input" />
                </div>

                {/* Summary */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Summary (Short)</label>
                    <textarea name="summary" rows={3} className="admin-input" required />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Content (Markdown/HTML)</label>
                    <textarea name="content" rows={10} className="admin-input" required />
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Requirements (One per line)</label>
                    <textarea name="requirements" rows={5} className="admin-input" />
                </div>

                {/* Timeline */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Timeline Text</label>
                    <input name="timelineText" type="text" className="admin-input" placeholder="e.g. 2-3 weeks" required />
                </div>

                {/* Featured */}
                <div className="flex items-center">
                    <input name="featured" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">Featured Service</label>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" className="admin-input">
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
                            <input name="seoTitle" type="text" className="admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                            <textarea name="seoDescription" rows={3} className="admin-input" />
                        </div>
                    </div>
                </div>

                {state?.error && <p className="text-red-500">{state.error}</p>}

                <div className="flex justify-end">
                    <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
                        {isPending ? 'Creating...' : 'Create Service'}
                    </button>
                </div>
            </form>
        </div>
    )
}
