'use client'

import { Section } from '@/components/public/Section'
import { Card } from '@/components/public/Card'
import { Reveal } from '@/components/motion'

export function HowItWorks() {
    return (
        <Section variant="white" className="relative z-10">
            <Reveal className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                    Your Visa Process, Simplified
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    We handle the complexities so you can focus on your journey. Here is how we work together.
                </p>
            </Reveal>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {STEPS.map((step, index) => (
                    <Card key={index} className="p-8 relative overflow-visible hover:border-blue-200 transition-colors">
                        <div className="absolute -top-6 left-6 h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-200 ring-4 ring-white">
                            {index + 1}
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    )
}

const STEPS = [
    {
        title: 'Consultation',
        description: 'We assess your eligibility and guide you through the initial requirements for your desired country.'
    },
    {
        title: 'Documentation',
        description: 'Our team helps you gather, verify, and translate all necessary official documents.'
    },
    {
        title: 'Submission',
        description: 'We submit your application directly to the embassy or relevant authority with 100% accuracy.'
    },
    {
        title: 'Approval',
        description: 'Once approved, we collect your visa and assist with post-issuance procedures like flight booking.'
    }
]
