import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CardProps {
    children: ReactNode
    className?: string
    href?: string
    hoverEffect?: boolean
}

/**
 * Card - Standard surface element for the Option A theme.
 * Clean white background, subtle border, and optional hover lift.
 */
export function Card({
    children,
    className,
    href,
    hoverEffect = false
}: CardProps) {
    const baseStyles = cn(
        "block bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden",
        hoverEffect && "transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-blue-100",
        className
    )

    if (href) {
        return (
            <Link href={href} className={baseStyles}>
                {children}
            </Link>
        )
    }

    return (
        <div className={baseStyles}>
            {children}
        </div>
    )
}

