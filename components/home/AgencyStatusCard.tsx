import Link from 'next/link'

interface AgencyStatusCardProps {
    licenseNumber?: string
    statusText?: string
    sinceYear?: string
    className?: string
}

export function AgencyStatusCard({
    licenseNumber = '1851',
    statusText = 'Active & Verified',
    className = '',
}: AgencyStatusCardProps) {
    return (
        // Outer frosted glass wrapper
        <div
            className={`
                relative overflow-hidden rounded-2xl
                bg-white/70 backdrop-blur-xl
                border border-slate-200/60
                shadow-[0_20px_50px_rgba(15,23,42,0.12)]
                hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]
                transition-all duration-300 ease-out
                motion-reduce:hover:translate-y-0 motion-reduce:transition-none
                ${className}
            `}
        >
            {/* Top accent gradient strip */}
            <div className="h-2 rounded-t-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />

            {/* Subtle glow under accent */}
            <div className="absolute top-2 left-0 w-full h-8 bg-gradient-to-b from-cyan-400/20 to-transparent blur-xl" />

            {/* Inner dark glass panel */}
            <div
                className="
                    mx-3 mt-1 mb-3 p-5 md:p-6
                    rounded-xl
                    bg-[#0B1220]/85 backdrop-blur-md
                    border border-white/10
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                "
            >
                {/* Header: Status + License */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-[11px] font-semibold text-slate-400/80 uppercase tracking-widest">
                            Agency Status
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                            {/* Green status dot with soft pulse */}
                            <span className="relative flex h-3 w-3">
                                <span
                                    className="
                                        absolute inline-flex h-full w-full rounded-full bg-emerald-400
                                        animate-pulse-soft
                                        motion-reduce:animate-none
                                    "
                                />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            </span>
                            <span className="font-semibold text-white">{statusText}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-[11px] font-semibold text-slate-400/80 uppercase tracking-widest">
                            License No
                        </h3>
                        <p className="mt-2 font-mono font-bold text-2xl text-white tracking-wide">
                            {licenseNumber}
                        </p>
                    </div>
                </div>

                {/* Trust badges */}
                <div className="space-y-3 border-t border-white/10 pt-5 mb-6">
                    <TrustBadge text="Ministry of Expatriates Approved" />
                    <TrustBadge text="Saudi Embassy Authorized" />
                    <TrustBadge text="BMET Registered Partner" />
                </div>

                {/* Verify button - glass style */}
                <Link
                    href="/verify-license"
                    className="
                        group flex items-center justify-center gap-2
                        w-full py-3.5 px-4 
                        bg-white/10 border border-white/15
                        text-white font-semibold rounded-xl 
                        text-center 
                        hover:bg-white/15 hover:border-white/25
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
        </div>
    )
}

function TrustBadge({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-slate-200/90">
            <svg
                className="w-5 h-5 text-emerald-400 flex-shrink-0"
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
