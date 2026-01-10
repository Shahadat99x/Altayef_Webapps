import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageShellProps {
    children: ReactNode
    title?: string
    description?: string
    className?: string
    headerAction?: ReactNode
}

/**
 * PageShell - The standard wrapper for all public pages (except Homepage).
 * Enforces consistent max-width, padding, and optional header layout.
 */
export function PageShell({
    children,
    title,
    description,
    className,
    headerAction,
}: PageShellProps) {
    return (
        <div className={cn("min-h-screen pt-24 pb-16", className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {(title || description) && (
                    <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="max-w-3xl">
                            {title && (
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                    {title}
                                </h1>
                            )}
                            {description && (
                                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                                    {description}
                                </p>
                            )}
                        </div>
                        {headerAction && (
                            <div className="flex-shrink-0">
                                {headerAction}
                            </div>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}
