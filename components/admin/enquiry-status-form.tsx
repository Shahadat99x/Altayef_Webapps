'use client'

import { useActionState } from 'react'
import { updateEnquiryAction } from '@/lib/actions/enquiries'

const initialState = {
    error: '',
    success: false
}

// Wrapper to match useActionState signature
// The action takes (id, prevState, formData)
// We need to bind ID first.
// But useActionState expects (prevState, formData) -> State

export default function EnquiryStatusForm({
    id,
    initialStatus,
    initialNotes
}: {
    id: string,
    initialStatus: string,
    initialNotes: string
}) {
    // Bind the ID to the action so it becomes (prevState, formData) => Promise<State>
    const updateEnquiryWithId = updateEnquiryAction.bind(null, id)
    const [state, formAction, isPending] = useActionState(updateEnquiryWithId, null)

    return (
        <form action={formAction} className="space-y-4">
            {state?.error && (
                <div className="bg-red-50 text-red-600 p-2 text-sm rounded">{state.error}</div>
            )}
            {state?.success && (
                <div className="bg-green-50 text-green-600 p-2 text-sm rounded">Updated successfully</div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    name="status"
                    defaultValue={initialStatus}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                    <option value="spam">Spam</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                <textarea
                    name="adminNotes"
                    rows={4}
                    defaultValue={initialNotes}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Internal notes..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {isPending ? 'Updating...' : 'Update Status'}
            </button>
        </form>
    )
}
