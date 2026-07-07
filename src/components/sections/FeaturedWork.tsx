'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const featured = projects.filter((p) => p.featured)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      // Horizontal scroll on desktop
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const totalScroll = track.scrollWidth - window.innerWidth

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * totalScroll })
        },
      })
    })

    mm.add('(max-width: 767px)', () => {
      // Vertical card reveal on mobile
      cardsRef.current.forEach((card) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-6 md:pb-0">
        <SectionLabel index="01">Featured Work</SectionLabel>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex md:flex-nowrap flex-wrap gap-6 md:gap-0 px-6 md:px-10 pb-16 md:pb-24 pt-10 md:pt-12 will-change-transform">
        {featured.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => { if (el) cardsRef.current[i] = el }}
            className="md:min-w-[36vw] md:pr-8 w-full md:w-auto"
          >
            <Link href={`/work/${project.slug}`} className="group block" data-cursor="VIEW">
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-[4/5] bg-white mb-5">
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{ background: `linear-gradient(135deg, ${project.coverColor}cc, #2B231C)` }}
                >
                  <div className="text-cream/20 font-display text-[10vw] md:text-[5vw] leading-none text-center px-4">
                    {project.client.toUpperCase()}
                  </div>
                  {/* Platform icon */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-cream/70 font-semibold border border-cream/20 px-2 py-1">
                      {project.platform}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/10 transition-colors duration-500" />

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full border border-terracotta/70 flex items-center justify-center">
                    <svg className="w-6 h-6 text-terracotta ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card info */}
              <div>
                <div className="text-espresso/40 text-[9px] tracking-[0.25em] uppercase mb-2">
                  {project.role.join(' · ')}
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-espresso group-hover:text-terracotta transition-colors duration-300 leading-tight">
                  {project.client.toUpperCase()}
                </h3>
                <p className="text-espresso/50 text-xs mt-2 leading-relaxed">{project.tagline}</p>
              </div>
            </Link>
          </div>
        ))}

        {/* View all CTA */}
        <div className="md:min-w-[20vw] flex items-center justify-center px-8 w-full md:w-auto py-8 md:py-0">
          <Link
            href="/work"
            className="group flex flex-col items-center gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-full border border-taupe/30 group-hover:border-terracotta flex items-center justify-center transition-colors duration-300">
              <svg className="w-5 h-5 text-espresso group-hover:text-terracotta transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <span className="text-espresso/50 group-hover:text-espresso text-[10px] tracking-[0.25em] uppercase font-semibold transition-colors duration-300">
              View All Work
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
