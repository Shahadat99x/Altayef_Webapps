/**
 * Text utilities for sanitizing content and creating excerpts
 */

/**
 * Strip markdown/rich text to plain text
 * Removes headings, emphasis, links, images, code blocks, etc.
 */
export function stripMarkdownToText(md: string | null | undefined): string {
    if (!md) return ''

    let text = md

    // Remove code blocks (```...```)
    text = text.replace(/```[\s\S]*?```/g, '')
    // Remove inline code (`...`)
    text = text.replace(/`[^`]+`/g, '')
    // Remove images ![alt](url)
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove links [text](url) -> text
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove headings (# ## ### etc)
    text = text.replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic markers (**, *, __, _)
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2')
    text = text.replace(/(\*|_)(.*?)\1/g, '$2')
    // Remove strikethrough ~~text~~
    text = text.replace(/~~(.*?)~~/g, '$1')
    // Remove blockquotes
    text = text.replace(/^>\s?/gm, '')
    // Remove horizontal rules
    text = text.replace(/^[-*_]{3,}$/gm, '')
    // Remove list markers (-, *, +, 1.)
    text = text.replace(/^\s*[-*+]\s+/gm, '')
    text = text.replace(/^\s*\d+\.\s+/gm, '')
    // Remove HTML tags
    text = text.replace(/<[^>]+>/g, '')
    // Normalize whitespace - collapse multiple spaces/newlines
    text = text.replace(/\s+/g, ' ')
    // Trim
    text = text.trim()

    return text
}

/**
 * Create a clean excerpt from text with max length
 * Adds ellipsis if truncated
 */
export function makeExcerpt(text: string | null | undefined, maxLen = 160): string {
    if (!text) return ''

    const clean = stripMarkdownToText(text)
    if (clean.length <= maxLen) return clean

    // Find last space before maxLen to avoid cutting words
    const truncated = clean.slice(0, maxLen)
    const lastSpace = truncated.lastIndexOf(' ')

    if (lastSpace > maxLen * 0.6) {
        return truncated.slice(0, lastSpace) + '…'
    }
    return truncated + '…'
}
