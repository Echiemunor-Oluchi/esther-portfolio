'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "I'm grateful I didn't make a mistake texting you to help me get this done. God bless you for putting your heart into these videos, I love the cinematic feel my videos carry. The pacing is very well done and it all just makes sense, it's so cute. I really love it.",
    attribution: "Client, Maka's Strands",
    featured: true,
  },
  {
    quote:
      "Working with Esther changed how I think about my content. She doesn't just edit. She sees the story you're trying to tell and makes it land.",
    attribution: 'Brand Client',
    featured: false,
  },
  {
    quote:
      "The turnaround was fast but the quality never felt rushed. Every detail was thoughtful. That's rare.",
    attribution: 'Creator Client',
    featured: false,
  },
]

export default function TestimonialsPage() {
  const heroRef = useRef<HTMLElement>(null)
  const quotesRef = useRef<HTMLElement[]>([])

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

    quotesRef.current.filter(Boolean).forEach((quote, i) => {
      gsap.fromTo(
        quote,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const featured = testimonials[0]
  const rest = testimonials.slice(1)

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-28 md:pt-36 pb-16 px-6 md:px-10 max-w-[1400px] mx-auto"
      >
        <SectionLabel>Kind Words</SectionLabel>
        <div className="mt-4 overflow-visible">
          <h1 className="font-display text-[14vw] md:text-[10vw] leading-none text-espresso">
            {['WHAT THEY', 'SAY'].map((word, i) => (
              <div key={i} className="overflow-hidden block">
                <span className="word inline-block">{word}</span>
              </div>
            ))}
          </h1>
        </div>
      </section>

      {/* Featured quote */}
      <section
        ref={(el) => { if (el) quotesRef.current[0] = el as HTMLElement }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto py-16 md:py-24 border-t border-taupe/5"
      >
        <div className="relative">
          <div
            className="absolute -top-16 -left-4 md:-left-8 font-display text-[25vw] text-espresso/3 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </div>
          <blockquote className="relative z-10 max-w-5xl">
            <p className="font-display text-[5vw] md:text-[3.5vw] lg:text-[2.8vw] text-espresso leading-[1.25] italic">
              "{featured.quote}"
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <div className="w-10 h-px bg-terracotta" />
              <cite className="not-italic text-xs tracking-[0.25em] uppercase text-espresso/40 font-semibold">
                {featured.attribution}
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* More testimonials */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-24 border-t border-taupe/5">
        <div className="pt-16 grid md:grid-cols-2 gap-8">
          {rest.map((t, i) => (
            <article
              key={i}
              ref={(el) => { if (el) quotesRef.current[i + 1] = el as HTMLElement }}
              className="bg-white p-8 md:p-10 border border-taupe/5 relative"
            >
              <div
                className="absolute top-4 right-6 font-display text-8xl text-espresso/5 leading-none select-none"
                aria-hidden="true"
              >
                "
              </div>
              <blockquote>
                <p className="text-espresso/60 text-sm leading-relaxed italic">"{t.quote}"</p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="w-4 h-px bg-terracotta/50" />
                  <cite className="not-italic text-[10px] tracking-[0.2em] uppercase text-espresso/30 font-semibold">
                    {t.attribution}
                  </cite>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20 text-center">
        <p className="text-espresso/30 text-sm mb-6">Ready to add your name to this list?</p>
        <a
          href="https://wa.me/2348034699451"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-terracotta text-cream font-bold text-xs tracking-[0.15em] uppercase px-8 py-4 hover:bg-terracotta-dim transition-colors duration-300"
        >
          Start a Conversation
        </a>
      </div>
    </div>
  )
}
