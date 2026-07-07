'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'

const roles = ['Video Editor', 'Video Strategist', 'Content Strategist']

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayRole, setDisplayRole] = useState(roles[0])

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    const nameWords = nameRef.current?.querySelectorAll('.word')
    if (nameWords) {
      gsap.set(nameWords, { y: '110%' })
      tl.to(nameWords, {
        y: '0%',
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
      })
    }
    tl.fromTo(
      [roleRef.current, subRef.current, ctaRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' },
      '<0.3'
    )
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '<0.4'
    )
    return () => { tl.kill() }
  }, [])

  // Ken Burns on bg
  useEffect(() => {
    if (!bgRef.current) return
    gsap.fromTo(bgRef.current, { scale: 1.08 }, { scale: 1.18, duration: 14, ease: 'none', repeat: -1, yoyo: true })
  }, [])

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!roleRef.current) return
    const el = roleRef.current
    gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
    setDisplayRole(roles[roleIndex])
  }, [roleIndex])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cream"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="w-full h-full bg-gradient-to-br from-rose/20 via-cream to-cream"
          style={{ transformOrigin: 'center center' }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
        {/* Blue accent glow */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-terracotta/5 blur-[120px] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-16 w-full grid md:grid-cols-2 gap-10 md:gap-0 items-center">
        {/* Left: text */}
        <div>
          {/* Label */}
          <div className="mb-6 text-espresso/30 text-[10px] tracking-[0.35em] uppercase font-semibold">
            Portfolio 2026
          </div>

          {/* Name */}
          <div ref={nameRef} className="overflow-visible">
            <h1
              className="font-display leading-[0.88] text-espresso tracking-tight overflow-visible"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 6rem)' }}
            >
              {['ESTHER', 'OZURUMBA'].map((word, i) => (
                <div key={i} className="overflow-hidden block">
                  <span className="word inline-block">{word}</span>
                </div>
              ))}
            </h1>
          </div>

          {/* Role cycling */}
          <div className="mt-6 md:mt-8 flex items-center gap-4">
            <span className="w-8 h-px bg-terracotta flex-shrink-0" />
            <div className="overflow-hidden h-7">
              <div ref={roleRef} className="text-terracotta text-sm md:text-base tracking-[0.12em] uppercase font-semibold">
                {displayRole}
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div ref={subRef} className="mt-6 max-w-md">
            <p className="text-espresso/50 text-sm md:text-base leading-relaxed">
              Cinematic short form content for brands that deserve to be seen. Based in Port Harcourt, working everywhere.
            </p>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-10 flex items-center gap-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 bg-terracotta text-cream font-bold text-xs tracking-[0.15em] uppercase px-8 py-4 hover:bg-terracotta-dim transition-colors duration-300"
              data-cursor="EXPLORE"
            >
              View Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="text-espresso/50 hover:text-espresso text-xs tracking-[0.15em] uppercase font-semibold transition-colors duration-300 border-b border-transparent hover:border-taupe/40 pb-0.5"
            >
              About Esther
            </Link>
          </div>
        </div>

        {/* Right: photo */}
        <div className="flex justify-center md:justify-end items-center md:items-end h-full pt-10 order-last">
          {/* Offset white frame */}
          <div className="relative">
            <div className="absolute -top-3 -right-3 w-full h-full border border-taupe/30 pointer-events-none z-0" />
            <div className="relative w-65 sm:w-80 md:w-105 lg:w-130 aspect-3/4 overflow-hidden z-10">
              <Image
                src="/images/esther-home.jpg"
                alt="Esther Ozurumba"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 320px, 400px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-2 rotate-90 origin-right">
          <span className="text-espresso/20 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-12 h-px bg-taupe/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-terracotta float-anim" />
          </div>
        </div>
    </section>
  )
}
