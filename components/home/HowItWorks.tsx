export function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Free Consultation",
            desc: "We analyze your profile and guide you on the best visa options for your destination.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        },
        {
            num: "02",
            title: "Document Review",
            desc: "Our experts verify all your documents to ensure they meet embassy requirements.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            num: "03",
            title: "Processing",
            desc: "We handle the submission, stamping, and embassy coordination on your behalf.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            return(
        <Section variant = "white" className = "relative z-10" >
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                    Your Visa Process, Simplified
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    We handle the complexities so you can focus on your journey. Here is how we work together.
                </p>
            </div>

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
        </Section >
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
