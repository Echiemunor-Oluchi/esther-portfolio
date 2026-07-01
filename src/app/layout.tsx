import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { CustomCursor } from '@/components/CustomCursor'
import { LenisWrapper } from '@/components/LenisWrapper'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Esther Ozurumba | Video Editor & Strategist',
  description:
    'Port Harcourt based video editor and social media strategist crafting cinematic short form content for brands and creators on TikTok and Instagram.',
  keywords: ['video editor', 'video strategist', 'social media strategy', 'TikTok', 'Instagram', 'Port Harcourt', 'Nigeria'],
  openGraph: {
    title: 'Esther Ozurumba | Video Editor & Strategist',
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
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-black text-off-white overflow-x-hidden">
        <LenisWrapper>
          <NoiseOverlay />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisWrapper>
      </body>
    </html>
  )
}
