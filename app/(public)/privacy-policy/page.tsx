import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Privacy Policy | Altayef Webapps',
    description: 'Privacy Policy for Altayef Webapps. Learn how we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen py-20">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Last updated: {new Date().toISOString().split('T')[0]}
                    </p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                        At Altayef Webapps (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our visa processing services.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect specific personal information necessary to provide our services and respond to your enquiries. This includes:
                    </p>
                    <ul>
                        <li><strong>Personal Identity:</strong> Name.</li>
                        <li><strong>Contact Information:</strong> Phone number, WhatsApp number, and optionally your email address.</li>
                        <li><strong>Service Details:</strong> Information about the specific services or countries you are interested in.</li>
                        <li><strong>Messages:</strong> Any additional details you provide in your enquiry forms or communications with us.</li>
                    </ul>

                    <h2>2. How We Use Your Data</h2>
                    <p>
                        We use the information we collect for the following purposes:
                    </p>
                    <ul>
                        <li>To respond to your enquiries and consultation requests.</li>
                        <li>To facilitate the visa processing and manpower services you have requested.</li>
                        <li>To communicate with you regarding the status of your application or service.</li>
                        <li>To provide customer support and address your concerns.</li>
                    </ul>

                    <h2>3. Communication Channels</h2>
                    <p>
                        We may contact you via phone, WhatsApp, or email to discuss your application or provide updates. By submitting your contact information, you consent to receive such communications from us related to our services.
                    </p>

                    <h2>4. Data Retention</h2>
                    <p>
                        We retain your personal data only for as long as is necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Once your service is complete or if you request us to delete your data, we will do so in accordance with our internal data management policies, unless required by law to keep it for a longer period.
                    </p>

                    <h2>5. Data Sharing</h2>
                    <p>
                        We do not sell, trade, or otherwise transfer your personal information to outside parties for marketing purposes. We may share your data with:
                    </p>
                    <ul>
                        <li><strong>Service Providers:</strong> Third parties who assist us in operating our website, conducting our business, or serving our users (e.g., hosting providers), so long as those parties agree to keep this information confidential.</li>
                        <li><strong>Government Authorities:</strong> When required for the processing of your visa or manpower clearance, or when required by law.</li>
                    </ul>

                    <h2>6. Security</h2>
                    <p>
                        We implement reasonable security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
                    </p>

                    <h2>7. Your Rights</h2>
                    <p>
                        You have the right to:
                    </p>
                    <ul>
                        <li>Request access to the personal data we hold about you.</li>
                        <li>Request correction of any incorrect or incomplete data.</li>
                        <li>Request deletion of your personal data, subject to legal requirements.</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us using the information provided below.
                    </p>

                    <h2>8. Third-Party Links</h2>
                    <p>
                        Our website may include links to third-party websites (e.g., WhatsApp for communication, Google Maps for location). These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
                    </p>

                    <h2>9. Contact Us</h2>
                    <p>
                        If you have any questions regarding this privacy policy, you may contact us at:
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
