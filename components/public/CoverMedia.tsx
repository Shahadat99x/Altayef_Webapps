import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CoverMediaProps {
    src?: string | null
    alt?: string | null
    type?: 'service' | 'country' | 'article'
    aspect?: '16/9' | '4/3' | '3/2'
    className?: string
}

/**
 * CoverMedia - Renders cover image or premium placeholder.
 * Always maintains fixed aspect ratio to prevent layout shift.
 */
export function CoverMedia({
    src,
    alt,
    type = 'service',
    aspect = '16/9',
    className,
}: CoverMediaProps) {
    const aspectClass = {
        '16/9': 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '3/2': 'aspect-[3/2]',
    }[aspect]

    // Gradient colors based on type
    const gradients = {
        service: 'from-blue-100 via-slate-50 to-blue-50',
        country: 'from-emerald-100 via-slate-50 to-blue-50',
        article: 'from-slate-100 via-slate-50 to-blue-50',
    }

    // Icons for each type
    const icons = {
        service: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        country: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        article: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        ),
    }

    if (src) {
        return (
            <div className={cn('relative overflow-hidden rounded-t-xl bg-slate-100', aspectClass, className)}>
                <Image
                    src={src}
                    alt={alt || ''}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        )
    }

    // Placeholder
    return (
        <div className={cn(
            'relative overflow-hidden rounded-t-xl',
            `bg-gradient-to-br ${gradients[type]}`,
            aspectClass,
            className
        )}>
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

            {/* Centered icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-400/60 shadow-inner ring-1 ring-slate-200/50">
                    {icons[type]}
                </div>
            </div>
        </div>
    )
}
