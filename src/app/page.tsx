'use client'

import { useState, useEffect } from 'react'
import { Preloader } from '@/components/Preloader'
import { Hero } from '@/components/sections/Hero'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { StatsSection } from '@/components/sections/StatsSection'
import { TestimonialPreview } from '@/components/sections/TestimonialPreview'
import { HomeCTA } from '@/components/sections/HomeCTA'
import { MarqueeStrip } from '@/components/MarqueeStrip'

const marqueeItems = ['TikTok', 'Instagram', 'Short Form', 'Video Editing', 'Strategy', 'Brand Content', 'Reels', 'Cinematic']

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('preloader-shown')) {
      setShowPreloader(true)
    }
  }, [])

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader-shown', '1')
    setShowPreloader(false)
  }

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero />
      <MarqueeStrip items={marqueeItems} className="bg-off-black" />
      <FeaturedWork />
      <AboutTeaser />
      <StatsSection />
      <TestimonialPreview />
      <HomeCTA />
    </>
  )
}
