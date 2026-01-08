import { getTestimonialById } from '@/lib/data/testimonials'
import TestimonialForm from '../form'
import { notFound } from 'next/navigation'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const testimonial = await getTestimonialById(id)

    if (!testimonial) {
        notFound()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Testimonial</h1>
            <TestimonialForm testimonial={testimonial} />
        </div>
    )
}
