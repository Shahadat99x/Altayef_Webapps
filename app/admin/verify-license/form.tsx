'use client'

import { updateLicenseAction } from '@/lib/actions/license'
import { License } from '@/lib/models/schema'
import { useActionState } from 'react'

export default function EditLicenseForm({ license }: { license: License }) {
    const [state, dispatch, isPending] = useActionState(updateLicenseAction, null)
    // const [showSuccess, setShowSuccess] = useState(false)

    // useEffect(() => { ... })

    return (
        <form action={dispatch} className="space-y-6 bg-white p-6 rounded shadow relative">
            {/* Success toast removed for simplicity/lint compliance */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Agency Name */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Agency Legal Name</label>
                    <input name="agencyLegalName" type="text" defaultValue={license.agencyLegalName} className="admin-input" required />
                    {state?.errors?.agencyLegalName && <p className="text-red-500 text-sm">{state.errors.agencyLegalName}</p>}
                </div>

                {/* License Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">License Number (RL/Lic No)</label>
                    <input name="licenseNumber" type="text" defaultValue={license.licenseNumber} className="admin-input" required />
                </div>

                {/* Authority */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Issuing Authority</label>
                    <input name="issuingAuthority" type="text" defaultValue={license.issuingAuthority} className="admin-input" placeholder="e.g. Govt of Bangladesh" required />
                </div>

                {/* Steps */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Verification Steps (How can a user verify this?)</label>
                    <p className="text-xs text-gray-500 mb-2">Enter one step per line.</p>
                    <textarea name="verificationSteps" rows={4} defaultValue={license.verificationSteps.join('\n')} className="admin-input" />
                </div>

                {/* Contact */}
                <div className="col-span-1 md:col-span-2 border-t pt-4">
                    <h3 className="font-medium text-gray-900 mb-4">Official Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Office Address</label>
                            <input name="officeAddress" type="text" defaultValue={license.officeAddress} className="admin-input" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input name="phone" type="text" defaultValue={license.phone} className="admin-input" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">WhatsApp (Optional)</label>
                            <input name="whatsapp" type="text" defaultValue={license.whatsapp} className="admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                            <input name="email" type="email" defaultValue={license.email} className="admin-input" />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="col-span-1 md:col-span-2 border-t pt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <p className="text-xs text-gray-500">Only &quot;Published&quot; content is visible to public.</p>
                        </div>
                        <select name="status" defaultValue={license.status || 'draft'} className="admin-input w-48">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>
            </div>

            {state?.error && <p className="text-red-500">{state.error}</p>}

            <div className="flex justify-end pt-4">
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 font-medium">
                    {isPending ? 'Saving...' : 'Save Configuration'}
                </button>
            </div>
        </form>
    )
}
