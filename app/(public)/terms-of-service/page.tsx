import { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/components/motion'

export const metadata: Metadata = {
    title: 'Terms of Service | Altayef Webapps',
    description: 'Terms of Service for Altayef Webapps. Understand our service scope, client responsibilities, and limitations.',
}

export default function TermsOfServicePage() {
    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen py-20">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <AnimatedSection className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Last updated: {new Date().toISOString().split('T')[0]}
                    </p>
                </AnimatedSection>


                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                        Welcome to Altayef Webapps. By accessing our website or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
                    </p>

                    <h2>1. Service Scope</h2>
                    <p>
                        Altayef Webapps is a government-approved visa processing and manpower agency based in Dhaka, Bangladesh (Recruiting License Number: RL-XXXX). We provide consultation, documentation assistance, and processing services for visas and employment abroad, specifically for Saudi Arabia and Gulf countries.
                    </p>
                    <p>
                        <strong>Important Notice:</strong> We act as an intermediary and facilitator. We are <strong>not</strong> a government authority and do not have the power to issue visas or work permits ourselves. The final decision on any visa application rests solely with the respective embassies or government authorities.
                    </p>

                    <h2>2. No Guarantee of Approval</h2>
                    <p>
                        While we strive to maximize the success of every application through our expertise and rigorous verification processes, we <strong>cannot and do not guarantee</strong> the approval of any visa or work permit. Approval is subject to the discretion of foreign governments and embassies. We are not liable for any rejection or delay caused by these authorities.
                    </p>

                    <h2>3. Client Responsibilities</h2>
                    <p>
                        As a client, you agree to:
                    </p>
                    <ul>
                        <li>Provide accurate, complete, and authentic information and documents.</li>
                        <li>Possess a valid passport with sufficient validity.</li>
                        <li>Adhere to all deadlines provided by our team for document submission.</li>
                        <li>Attend any required interviews or medical examinations.</li>
                    </ul>
                    <p>
                        Submission of fake or forged documents will result in immediate termination of our services and may lead to legal action.
                    </p>

                    <h2>4. Fees and Payments</h2>
                    <p>
                        Service fees will be discussed and agreed upon during consultation. All fees must be paid according to the schedule provided by our team.
                    </p>
                    <ul>
                        <li>Fees paid for government charges, embassy fees, or medical tests are generally non-refundable once incurred.</li>
                        <li>Our service charges may be refundable only under specific conditions outlined in your service agreement.</li>
                    </ul>

                    <h2>5. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by law, Altayef Webapps shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from:
                    </p>
                    <ul>
                        <li>Rejection or delay of visa applications by third-party authorities.</li>
                        <li>Changes in immigration laws or policies of Bangladesh or the destination country.</li>
                        <li>Your access to or use of, or inability to access or use, our services.</li>
                    </ul>

                    <h2>6. Prohibited Use</h2>
                    <p>
                        You agree not to use our website or services for any unlawful purpose, including but not limited to submitting false information, impersonating others, or attempting to defraud us or any government authority.
                    </p>

                    <h2>7. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Dhaka, Bangladesh.
                    </p>

                    <h2>8. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <p>
                        <strong>Altayef Webapps</strong><br />
                        Dhaka, Bangladesh<br />
                        <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                            Visit our Contact Page
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
