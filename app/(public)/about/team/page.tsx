import { listTeamMembersPublic } from '@/lib/data/team'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Team | Altayef',
    description: 'Meet the dedicated professionals at Altayef who make your visa process seamless.',
}

export default async function TeamPage() {
    const team = await listTeamMembersPublic()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-5xl">Meet Our Team</h1>
                <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Experienced professionals dedicated to your success.
                </p>
            </div>

            {team.length === 0 ? (
                <p className="text-center text-slate-500 dark:text-slate-400">Coming soon.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {team.map((member) => (
                        <div key={member._id?.toString()} className="flex flex-col items-center text-center">
                            <div className="relative w-48 h-48 mb-6">
                                {member.photoUrl ? (
                                    <img
                                        src={member.photoUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-full shadow-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300 text-4xl font-bold shadow-lg">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
                            {member.bio && (
                                <p className="text-slate-500 dark:text-slate-400 max-w-xs">{member.bio}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
