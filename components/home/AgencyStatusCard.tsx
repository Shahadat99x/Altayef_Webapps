import Link from 'next/link'

interface AgencyStatusCardProps {
    licenseNumber?: string
    statusText?: string
    sinceYear?: string
    className?: string
}

export function AgencyStatusCard({
    licenseNumber = 'RL-1851',
    statusText = 'Active & Verified',
    className = '',
}: AgencyStatusCardProps) {
    return (
        <div
            className={`
                bg-white border border-slate-200/60 rounded-2xl shadow-lg 
                p-8 relative overflow-hidden
                hover:shadow-xl hover:-translate-y-0.5 
                transition-all duration-300 ease-out
                motion-reduce:hover:translate-y-0 motion-reduce:transition-none
                ${className}
            `}
        >
            {/* Top accent gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />

            {/* Header: Status + License */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Agency Status
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                        {/* Green status dot with slow pulse */}
                        <span className="relative flex h-3 w-3">
                            <span
                                className="
                                    absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75
                                    animate-pulse-slow
                                    motion-reduce:animate-none
                                "
                            />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                        </span>
                        <span className="font-bold text-slate-900">{statusText}</span>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        License No
                    </h3>
                    <p className="mt-2 font-mono font-bold text-xl text-slate-900 tracking-wide">
                        {licenseNumber}
                    </p>
                </div>
            </div>

            {/* Trust badges */}
            <div className="space-y-3 border-t border-slate-100 pt-6 mb-8">
                <TrustBadge text="Ministry of Expatriates Approved" />
                <TrustBadge text="Saudi Embassy Authorized" />
                <TrustBadge text="BMET Registered Partner" />
            </div>

            {/* Verify button with arrow animation */}
            <Link
                href="/verify-license"
                className="
                    group flex items-center justify-center gap-2
                    w-full py-3.5 px-4 
                    bg-slate-50 border border-slate-200 
                    text-slate-700 font-semibold rounded-xl 
                    text-center 
                    hover:bg-slate-100 hover:border-slate-300
                    transition-colors duration-200
                "
            >
                <span>Verify Our License</span>
                <svg
                    className="
                        w-4 h-4 
                        transition-transform duration-200 
                        group-hover:translate-x-1
                        motion-reduce:group-hover:translate-x-0
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    )
}

function TrustBadge({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-slate-700">
            <svg
                className="w-5 h-5 text-emerald-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{text}</span>
        </div>
    )
}
