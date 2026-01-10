import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getSiteSettings } from '@/lib/data/settings'

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const settings = await getSiteSettings()

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans antialiased">
            <Header settings={settings} />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}
