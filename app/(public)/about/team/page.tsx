import { listTeamMembersPublic } from '@/lib/data/team'
import { Metadata } from 'next'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'

export const metadata: Metadata = {
    title: 'Our Team | Altayef',
    description: 'Meet the dedicated professionals at Altayef who make your visa process seamless.',
}

export default async function TeamPage() {
    const team = await listTeamMembersPublic()

    return (
        <PageShell title="Meet Our Team" description="Experienced professionals dedicated to your success.">
            {team.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                    <p>Coming soon.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member) => (
                        <Card key={member._id?.toString()} hoverEffect className="overflow-hidden group">
                            <div className="aspect-square relative overflow-hidden bg-slate-100">
                                {member.photoUrl ? (
                                    <img
                                        src={member.photoUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <span className="text-4xl font-bold uppercase">{member.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                                {member.bio && (
                                    <p className="text-slate-500 text-sm line-clamp-3">{member.bio}</p>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </PageShell>
    )
}
