'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { durations, ease, distances, viewportDefaults } from '@/lib/motion/tokens'

export type RevealVariant = 'fadeUp' | 'fade' | 'none'

interface RevealProps {
    children: ReactNode
    /** Animation variant */
    variant?: RevealVariant
    /** Delay before animation starts (seconds) */
    delay?: number
    /** Animation duration (seconds) */
    duration?: number
    /** Only animate once when entering viewport */
    once?: boolean
    /** Viewport intersection threshold (0-1) */
    amount?: number
    /** Additional className */
    className?: string
}

const getVariants = (variant: RevealVariant): Variants => {
    switch (variant) {
        case 'fadeUp':
            return {
                hidden: { opacity: 0, y: distances.smallY },
                visible: { opacity: 1, y: 0 },
            }
        case 'fade':
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }
        case 'none':
        default:
            return {
                hidden: {},
                visible: {},
            }
    }
}

/**
 * Reveal - Scroll-triggered reveal animation wrapper.
 * Respects prefers-reduced-motion automatically.
 */
export function Reveal({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = durations.base,
    once = viewportDefaults.once,
    amount = viewportDefaults.amount,
    className,
}: RevealProps) {
    const shouldReduceMotion = useReducedMotion()

    // If reduced motion, render without animation
    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>
    }

    const variants = getVariants(variant)

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={variants}
            transition={{
                duration,
                delay,
                ease,
            }}
        >
            {children}
        </motion.div>
    )
}
