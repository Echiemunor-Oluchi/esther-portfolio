'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function TestimonialPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!quoteRef.current || !sectionRef.current) return
    gsap.fromTo(
      quoteRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel index="04">Testimonials</SectionLabel>

        <div ref={quoteRef} className="mt-12 relative">
          {/* Large quote mark */}
          <div
            className="absolute -top-10 -left-4 md:-left-8 font-display text-[20vw] text-white/3 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </div>

          <blockquote className="relative z-10 max-w-4xl">
            <p className="font-display text-[5vw] md:text-[3vw] text-white leading-[1.2] italic">
              "I'm grateful I didn't make a mistake texting you to help me get this done. God bless you for putting your heart into these videos, I love the cinematic feel my videos carry. The pacing is very well done and it all just makes sense, it's so cute. I really love it."
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="w-8 h-px bg-accent" />
              <div>
                <cite className="not-italic text-xs tracking-[0.2em] uppercase text-white/50 font-semibold">
                  Client, Maka's Strands
                </cite>
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="/testimonials"
            className="text-white/30 hover:text-accent text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300 inline-flex items-center gap-2"
          >
            Read More
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
