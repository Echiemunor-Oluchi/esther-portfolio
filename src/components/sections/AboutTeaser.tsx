'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      if (!imageRef.current || !textRef.current) return
      // Parallax on image
      gsap.to(imageRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    if (!textRef.current) return
    gsap.fromTo(
      textRef.current.querySelectorAll('.reveal-item'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-cream py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative order-2 md:order-1">
            <div className="relative aspect-[3/4] overflow-hidden bg-white">
              <Image
                src="/images/esther-headshot.jpg"
                alt="Esther Ozurumba, Video Editor & Strategist"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Blue accent border */}
              <div className="absolute inset-0 border border-terracotta/20" />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-4 -right-4 bg-terracotta px-4 py-3">
              <div className="text-cream text-[9px] tracking-[0.25em] uppercase font-semibold">Port Harcourt, NG</div>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="order-1 md:order-2">
            <div className="reveal-item">
              <SectionLabel index="02">About</SectionLabel>
            </div>

            <div className="reveal-item mt-6 overflow-hidden">
              <h2 className="font-display text-[12vw] md:text-[6vw] leading-none text-espresso">
                THE EDITOR
                <br />
                <span className="text-espresso/30">BEHIND THE</span>
                <br />
                CONTENT
              </h2>
            </div>

            <div className="reveal-item mt-8 space-y-4">
              <p className="text-espresso/60 text-sm leading-relaxed">
                I am Esther Ozurumba, a video editor and content strategist based in Port Harcourt, Nigeria. I specialize in video editing, video strategy for brands, and content strategy.
              </p>
              <p className="text-espresso/60 text-sm leading-relaxed">
                I help brands and creators turn raw footage into cinematic, scroll stopping content across TikTok and Instagram. I go beyond the edit to think through the strategy behind what gets posted and why.
              </p>
            </div>

            <div className="reveal-item mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-terracotta text-xs tracking-[0.15em] uppercase font-semibold border-b border-terracotta pb-0.5 hover:text-espresso hover:border-taupe transition-colors duration-300"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
