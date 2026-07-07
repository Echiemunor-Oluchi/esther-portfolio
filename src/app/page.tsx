import { Hero } from '@/components/sections/Hero'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { StatsSection } from '@/components/sections/StatsSection'
import { TestimonialPreview } from '@/components/sections/TestimonialPreview'
import { HomeCTA } from '@/components/sections/HomeCTA'
import { MarqueeStrip } from '@/components/MarqueeStrip'

const marqueeItems = ['TikTok', 'Instagram', 'Short Form', 'Video Editing', 'Strategy', 'Brand Content', 'Reels', 'Cinematic']

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip items={marqueeItems} className="bg-cream" />
      <FeaturedWork />
      <AboutTeaser />
      <StatsSection />
      <TestimonialPreview />
      <HomeCTA />
    </>
  )
}
