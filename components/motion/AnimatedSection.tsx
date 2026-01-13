'use client'

import { ReactNode } from 'react'
import { Reveal, type RevealVariant } from './Reveal'

interface AnimatedSectionProps {
    children: ReactNode
    /** Animation variant */
    variant?: RevealVariant
    /** Delay in seconds */
    delay?: number
    /** Additional className */
    className?: string
}

/**
 * AnimatedSection - Client wrapper for server-rendered content.
 * Wraps children in Reveal animation without converting parent to client.
 */
export function AnimatedSection({
    children,
    variant = 'fadeUp',
    delay = 0,
    className,
}: AnimatedSectionProps) {
    return (
        <Reveal variant={variant} delay={delay} className={className}>
            {children}
        </Reveal>
    )
}
