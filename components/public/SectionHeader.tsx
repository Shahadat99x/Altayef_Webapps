'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
    title: string
    description?: string
    linkHref?: string
    linkLabel?: string
    className?: string
    /** Center the header (for testimonials-style sections) */
    centered?: boolean
}

/**
 * SectionHeader - Consistent section heading pattern
 * Mobile: stacked layout (title, description, link)
 * Desktop: title/description left, link right
 */
export function SectionHeader({
    title,
    description,
    linkHref,
    linkLabel,
    className,
    centered = false,
}: SectionHeaderProps) {
    if (centered) {
        return (
            <div className={cn("text-center mb-10 sm:mb-12", className)}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                    {title}
                </h2>
                {description && (
                    <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
                        {description}
                    </p>
                )}
                {linkHref && linkLabel && (
                    <div className="mt-6">
                        <Link
                            href={linkHref}
                            className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 hover:-translate-y-0.5 transition-transform"
                        >
                            {linkLabel}
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={cn(
            "flex flex-col gap-3 mb-8 sm:mb-10",
            "sm:flex-row sm:justify-between sm:items-end sm:gap-6",
            className
        )}>
            <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    {title}
                </h2>
                {description && (
                    <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
            {linkHref && linkLabel && (
                <Link
                    href={linkHref}
                    className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1 text-sm sm:text-base hover:-translate-y-0.5 transition-transform shrink-0"
                >
                    {linkLabel}
                    <span aria-hidden="true">&rarr;</span>
                </Link>
            )}
        </div>
    )
}
