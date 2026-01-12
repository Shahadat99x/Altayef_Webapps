/**
 * Motion tokens for consistent animations across the site.
 * Uses Framer Motion conventions.
 */

/** Duration constants in seconds */
export const durations = {
    fast: 0.18,
    base: 0.5,
    slow: 0.8,
} as const

/** Easing curve - smooth ease-out for natural feel */
export const ease = [0.25, 0.1, 0.25, 1] as const

/** Distance values for transforms (in pixels) */
export const distances = {
    /** Scroll reveal slide distance */
    smallY: 10,
    /** Hover lift effect */
    hoverLift: 2,
} as const

/** Default viewport options for scroll-triggered animations */
export const viewportDefaults = {
    once: true,
    amount: 0.25,
} as const
