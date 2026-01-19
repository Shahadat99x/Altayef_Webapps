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
                shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)]
                hover:-translate-y-1 hover:shadow-[0_35px_80px_-15px_rgba(15,23,42,0.45)]
                transition-all duration-300 ease-out
                motion-reduce:hover:translate-y-0 motion-reduce:transition-none
                ${className}
            `}
        >
            {/* Gradient accent on right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-blue-600" />

            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />

            {/* Floating icon badge */}
            <div className="absolute -top-2 -right-2 z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative p-6 md:p-7">
                {/* Header */}
                <h3 className="text-lg font-bold text-white mb-6">
                    Agency Profile
                </h3>

                {/* Stats Grid */}
                <div className="space-y-5">
                    {/* License Number */}
                    <div>
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                            License Number
                        </span>
                        <p className="mt-1 text-xl font-bold text-blue-400 tracking-wide">
                            {licenseNumber}
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                            Status
                        </span>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-soft motion-reduce:animate-none" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                            </span>
                            <span className="font-semibold text-emerald-400">{statusText}</span>
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                            Experience
                        </span>
                        <p className="mt-1 font-bold text-white">
                            Since {sinceYear}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-6 mb-5 border-t border-white/10" />

                {/* CTA Button */}
                <Link
                    href="/verify-license"
                    className="
                        group flex items-center justify-center gap-2
                        w-full py-3.5 px-4 
                        bg-slate-800/80 border border-slate-700/50
                        text-slate-300 font-medium rounded-xl 
                        text-center text-sm
                        hover:bg-slate-700/80 hover:text-white hover:border-slate-600
                        transition-all duration-200
                    "
                >
                    <span>Verify Official Status</span>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
