import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LenisWrapper } from '@/components/LenisWrapper'

const fraunces = Fraunces({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Esther Ozurumba | Video Editor & Content Strategist',
  description:
    'Port Harcourt based video editor and content strategist crafting cinematic short form content for brands and creators on TikTok and Instagram.',
  keywords: ['video editor', 'video strategist', 'content strategy', 'TikTok', 'Instagram', 'Port Harcourt', 'Nigeria'],
  openGraph: {
    title: 'Esther Ozurumba | Video Editor & Content Strategist',
    description: 'Cinematic short-form content for brands and creators.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-espresso overflow-x-hidden">
        <LenisWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisWrapper>
      </body>
    </html>
  )
}
