'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { durations, ease, distances, viewportDefaults } from '@/lib/motion/tokens'

interface StaggerProps {
    children: ReactNode
    /** Stagger delay between children (seconds) */
    stagger?: number
    /** Initial delay before stagger starts (seconds) */
    delayChildren?: number
    /** Only animate once when entering viewport */
    once?: boolean
    /** Viewport intersection threshold (0-1) */
    amount?: number
    /** Additional className */
    className?: string
}

const containerVariants: Variants = {
    hidden: {},
    visible: (custom: { stagger: number; delayChildren: number }) => ({
        transition: {
            staggerChildren: custom.stagger,
            delayChildren: custom.delayChildren,
        },
    }),
}

const childVariants: Variants = {
    hidden: { opacity: 0, y: distances.smallY },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.base,
            ease,
        },
    },
}

/**
 * Stagger - Container that staggers children animations.
 * Wrap each direct child in StaggerItem for the effect.
 * Respects prefers-reduced-motion automatically.
 */
export function Stagger({
    children,
    stagger = 0.1,
    delayChildren = 0,
    once = viewportDefaults.once,
    amount = viewportDefaults.amount,
    className,
}: StaggerProps) {
    const shouldReduceMotion = useReducedMotion()

    // If reduced motion, render without animation
    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={containerVariants}
            custom={{ stagger, delayChildren }}
        >
            {children}
        </motion.div>
    )
}

interface StaggerItemProps {
    children: ReactNode
    className?: string
}

/**
 * StaggerItem - Child wrapper for Stagger container.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
    return (
        <motion.div className={className} variants={childVariants}>
            {children}
        </motion.div>
    )
}
