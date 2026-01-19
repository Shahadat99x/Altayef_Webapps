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
    sinceYear = '2017',
    className = '',
}: AgencyStatusCardProps) {
    return (
        <div
            className={`
                relative overflow-hidden rounded-2xl
                bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800
                border border-slate-700/40
                shadow-[0_20px_40px_-12px_rgba(15,23,42,0.25)]
                hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.32)]
                transition-all duration-200 ease-out
                motion-reduce:hover:translate-y-0 motion-reduce:transition-none
                ${className}
            `}
        >
            {/* Subtle gradient accent on right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400/80 via-emerald-400/60 to-blue-500/80" />

            {/* Very subtle inner glow from right */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-emerald-500/5 to-transparent" />

            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Floating shield badge - refined size and position */}
            <div className="absolute top-3 right-3 z-10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md shadow-emerald-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative p-5 md:p-6">
                {/* Header */}
                <h3 className="text-base font-semibold text-white mb-5">
                    Agency Profile
                </h3>

                {/* Stats Grid - tighter spacing */}
                <div className="space-y-4">
                    {/* License Number */}
                    <div>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                            License Number
                        </span>
                        <p className="mt-0.5 text-lg font-bold text-blue-400">
                            {licenseNumber}
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                            Status
                        </span>
                        <div className="mt-0.5 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 animate-pulse-soft motion-reduce:animate-none" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-sm font-semibold text-emerald-400">{statusText}</span>
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                            Experience
                        </span>
                        <p className="mt-0.5 text-sm font-semibold text-white">
                            Since {sinceYear}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-5 mb-4 border-t border-white/[0.08]" />

                {/* CTA Button */}
                <Link
                    href="/verify-license"
                    className="
                        group flex items-center justify-center gap-2
                        w-full py-3 px-4 
                        bg-slate-800/60 border border-slate-700/40
                        text-slate-400 font-medium rounded-lg 
                        text-center text-sm
                        hover:bg-slate-700/60 hover:text-slate-200 hover:border-slate-600/60
                        transition-colors duration-150
                    "
                >
                    <span>Verify Official Status</span>
                    <svg
                        className="
                            w-3.5 h-3.5 
                            transition-transform duration-150 
                            group-hover:translate-x-0.5
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
