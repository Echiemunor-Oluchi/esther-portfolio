'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Video Editing',
    subtitle: 'Cinematic short-form edits for TikTok and Instagram',
    description:
      'Raw footage becomes something people stop scrolling for. Every cut, transition, and beat is placed with intention. No filler. The result: content that feels like it was made by someone who actually cares about the craft.',
    tags: ['TikTok Edits', 'Instagram Reels', 'Brand Videos', 'Creator Content'],
    accent: true,
  },
  {
    num: '02',
    title: 'Video Strategy for Brands',
    subtitle: 'Planning content direction, pacing, and storytelling',
    description:
      "The edit is only half the equation. Before the first cut, there's a question: what story should this brand be telling right now? Video strategy maps that out. The narrative, the format, the pacing approach, so every piece has a reason to exist.",
    tags: ['Content Direction', 'Narrative Strategy', 'Brand Storytelling', 'Platform Strategy'],
    accent: false,
  },
  {
    num: '03',
    title: 'Content Strategy',
    subtitle: 'Managing and growing accounts end-to-end',
    description:
      'Editing is one skill. Growing an account takes more: knowing what to post, when, with what framing, and how to read what\'s working. This service handles everything from content planning to execution. As seen with Youth Mama Mentors.',
    tags: ['Account Growth', 'Content Calendar', 'Engagement Strategy', 'Analytics'],
    accent: false,
  },
]

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null)
  const sectionsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!heroRef.current) return
    const words = heroRef.current.querySelectorAll('.word')
    gsap.set(words, { y: '110%' })
    gsap.to(words, {
      y: '0%',
      stagger: 0.07,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.1,
    })

    sectionsRef.current.filter(Boolean).forEach((section, i) => {
      const fromX = i % 2 === 0 ? -80 : 80
      const content = section.querySelectorAll('.reveal-item')
      gsap.fromTo(
        content,
        { x: fromX * 0.3, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-28 md:pt-36 pb-16 px-6 md:px-10 max-w-[1400px] mx-auto"
      >
        <SectionLabel>Services</SectionLabel>
        <div className="mt-4 overflow-visible">
          <h1 className="font-display text-[16vw] md:text-[11vw] leading-none text-espresso">
            {['WHAT', 'I DO'].map((word, i) => (
              <div key={i} className="overflow-hidden block">
                <span className="word inline-block">{word}</span>
              </div>
            ))}
          </h1>
        </div>
        <p className="mt-6 text-espresso/40 text-sm max-w-sm">
          Three service lines. One through line: content that earns its watch time.
        </p>
      </section>

      {/* Services */}
      {services.map((service, i) => (
        <section
          key={service.num}
          ref={(el) => { if (el) sectionsRef.current[i] = el }}
          className={`px-6 md:px-10 max-w-[1400px] mx-auto py-16 md:py-24 border-t border-taupe/5 ${
            i % 2 === 0 ? '' : 'md:pl-24'
          }`}
        >
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start">
            {/* Number */}
            <div className="reveal-item flex md:justify-end">
              <div>
                <span className="font-display text-[18vw] md:text-[8vw] text-espresso/5 leading-none block">
                  {service.num}
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="reveal-item">
                <div className="text-terracotta text-[10px] tracking-[0.25em] uppercase font-semibold mb-3">
                  {service.subtitle}
                </div>
              </div>

              <div className="reveal-item overflow-hidden">
                <h2 className="font-display text-[8vw] md:text-[5vw] leading-none text-espresso mb-6">
                  {service.title.toUpperCase()}
                </h2>
              </div>

              <div className="reveal-item">
                <p className="text-espresso/50 text-sm md:text-base leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>

              <div className="reveal-item flex flex-wrap gap-2 mt-6">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.15em] uppercase text-espresso/30 border border-taupe/10 px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {service.num === '03' && (
                <div className="reveal-item mt-6">
                  <Link
                    href="/work/youth-mama-mentors"
                    className="inline-flex items-center gap-2 text-terracotta text-xs tracking-[0.15em] uppercase font-semibold border-b border-terracotta/40 pb-0.5 hover:border-terracotta transition-colors duration-300"
                  >
                    See It in Action: Youth Mama Mentors
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto py-20 md:py-32 border-t border-taupe/5 text-center">
        <h2 className="font-display text-[12vw] md:text-[7vw] text-espresso leading-none">
          READY TO START?
        </h2>
        <p className="mt-4 text-espresso/40 text-sm max-w-sm mx-auto">
          WhatsApp is where conversations happen. Click below and let's talk about your project.
        </p>
        <div className="mt-8">
          <a
            href="https://wa.me/2348034699451"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-terracotta text-cream font-bold text-xs tracking-[0.15em] uppercase px-10 py-5 hover:bg-terracotta-dim transition-colors duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
