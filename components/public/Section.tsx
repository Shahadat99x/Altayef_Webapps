import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
    children: ReactNode
    className?: string
    variant?: "white" | "slate" | "navy"
}

/**
 * Section - Reusable block for page content strips.
 */
export function Section({
    children,
    className,
    variant = "white",
}: SectionProps) {
    const bgColors = {
        white: "bg-white",
        slate: "bg-slate-50",
        navy: "bg-[#0B1220] text-white",
    }

    return (
        <section className={cn(bgColors[variant], "py-16 md:py-24", className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    )
}
