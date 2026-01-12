'use client'

import { ReactNode } from 'react'
import { Stagger, StaggerItem } from './Stagger'

interface AnimatedGridProps {
    children: ReactNode
    /** Stagger delay between items (seconds) */
    stagger?: number
    /** Initial delay before stagger starts (seconds) */
    delayChildren?: number
    /** Additional className for the grid container */
    className?: string
}

/**
 * AnimatedGrid - Client wrapper for staggering grid children.
 * Use this to wrap server-rendered card grids.
 */
export function AnimatedGrid({
    children,
    stagger = 0.08,
    delayChildren = 0,
    className,
}: AnimatedGridProps) {
    return (
        <Stagger stagger={stagger} delayChildren={delayChildren} className={className}>
            {children}
        </Stagger>
    )
}

/**
 * AnimatedGridItem - Wrapper for each item in an AnimatedGrid.
 * Re-export of StaggerItem for convenience.
 */
export { StaggerItem as AnimatedGridItem }
