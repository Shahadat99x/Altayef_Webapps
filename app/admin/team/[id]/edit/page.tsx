import { getTeamMemberById } from '@/lib/data/team'
import TeamForm from '../../form'
import { notFound } from 'next/navigation'

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const member = await getTeamMemberById(id)

    if (!member) {
        notFound()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Team Member</h1>
            <TeamForm member={member} />
        </div>
    )
}
