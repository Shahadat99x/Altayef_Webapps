import { listTeamMembersAdmin } from '@/lib/data/team'
import Link from 'next/link'

export default async function TeamListPage() {
    const members = await listTeamMembersAdmin()

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Team Members</h1>
                <Link href="/admin/team/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Add Member
                </Link>
            </div>

            <div className="bg-white shadow rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members.map((member) => (
                            <tr key={member._id?.toString()}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            {member.photoUrl ? (
                                                <img className="h-10 w-10 rounded-full object-cover" src={member.photoUrl} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Img</div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            <div className="text-sm text-gray-500">{member.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${member.status === 'published' ? 'bg-green-100 text-green-800' :
                                            member.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {member.order} {member.featured && <span className="ml-2 text-xs text-blue-600 font-bold">★ Featured</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/team/${member._id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
