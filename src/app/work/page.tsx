'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { SectionLabel } from '@/components/SectionLabel'
import { MarqueeStrip } from '@/components/MarqueeStrip'

gsap.registerPlugin(ScrollTrigger)

type FilterTag = 'All' | 'Video Editing' | 'Video Strategy' | 'Social Media Strategy'
const filters: FilterTag[] = ['All', 'Video Editing', 'Video Strategy', 'Social Media Strategy']

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All')
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const filtered = projects.filter((p) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Video Strategy') return p.role.includes('Video Strategy')
    return p.tags.some((t) => t === activeFilter) || p.role.includes(activeFilter)
  })

  useEffect(() => {
    if (!headlineRef.current) return
    const words = headlineRef.current.querySelectorAll('.word')
    gsap.set(words, { y: '110%' })
    gsap.to(words, {
      y: '0%',
      stagger: 0.06,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, [])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
      }
    )
  }, [filtered])

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionLabel>Selected Work</SectionLabel>
        <div className="overflow-hidden mt-4">
          <h1
            ref={headlineRef}
            className="font-display text-[18vw] md:text-[12vw] leading-none text-white"
          >
            {['THE', 'WORK'].map((word, i) => (
              <span key={i} className="word-wrapper block overflow-hidden">
                <span className="word inline-block">{word}</span>
              </span>
            ))}
          </h1>
        </div>
        <p className="mt-6 text-white/40 text-sm max-w-sm">
          Short-form content crafted for brands and creators across TikTok and Instagram.
        </p>
      </section>

      <MarqueeStrip
        items={['Maka\'s Strands', 'Abdella', 'Her Flow Care', 'Youth Mama Mentors']}
        className="mb-0"
      />

      {/* Filters */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto py-10">
        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[10px] tracking-[0.2em] uppercase font-semibold px-4 py-2 border transition-all duration-300 ${
                activeFilter === f
                  ? 'border-accent bg-accent text-white'
                  : 'border-white/20 text-white/40 hover:border-white/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((project, i) => (
            <div
              key={project.slug}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block"
                data-cursor="VIEW"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal mb-4">
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${project.coverColor}aa, #0A0A0A)` }}
                  >
                    <div className="font-display text-[8vw] md:text-[4vw] text-white/10 text-center px-6 leading-none">
                      {project.client.toUpperCase()}
                    </div>
                  </div>

                  {/* Platform */}
                  <div className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase text-white/40 border border-white/10 px-2 py-1">
                    {project.platform}
                  </div>

                  {/* Hover */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full border border-accent flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Blue ring glow on hover */}
                  <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-500" />
                </div>

                <div>
                  <div className="text-white/30 text-[9px] tracking-[0.25em] uppercase mb-1">
                    {project.role.join(' · ')}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-white group-hover:text-accent transition-colors duration-300">
                    {project.client.toUpperCase()}
                  </h2>
                  <p className="text-white/30 text-xs mt-1 leading-relaxed">{project.tagline}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] tracking-[0.1em] uppercase text-white/25 border border-white/10 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
