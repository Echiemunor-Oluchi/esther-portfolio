'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  {
    label: 'TikTok',
    handle: '@e.o.creative',
    href: 'https://www.tiktok.com/@e.o.creative',
    desc: 'Editing work & behind the scenes',
  },
  {
    label: 'X / Twitter',
    handle: '@pr_nurse',
    href: 'https://x.com/pr_nurse',
    desc: 'Thoughts on content & strategy',
  },
  {
    label: 'LinkedIn',
    handle: 'Esther Ozurumba',
    href: 'https://www.linkedin.com/in/esther-ozurumba-575706248',
    desc: 'Professional profile',
  },
]

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLLIElement[]>([])

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

    gsap.fromTo(
      ctaRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    linksRef.current.filter(Boolean).forEach((li, i) => {
      gsap.fromTo(
        li,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: li,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-28 md:pt-36 pb-16 px-6 md:px-10 max-w-[1400px] mx-auto"
      >
        <SectionLabel>Get in Touch</SectionLabel>
        <div className="mt-4 overflow-visible">
          <h1 className="font-display leading-none text-white">
            {["LET'S CREATE", 'SOMETHING', 'CINEMATIC'].map((word, i) => (
              <div key={i} className="overflow-hidden block">
                <span
                  className="word inline-block"
                  style={{ fontSize: 'clamp(2.5rem, 10vw, 9rem)' }}
                >
                  {word}
                </span>
              </div>
            ))}
          </h1>
        </div>
      </section>

      {/* Main CTA */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left: WhatsApp card */}
          <div ref={ctaRef} className="bg-charcoal border border-white/5 p-10 md:p-16">
            <div className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">Primary Contact</div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">WHATSAPP</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
              The fastest way to start. Send me a message about your project. No forms, no waiting, just a real conversation.
            </p>
            <a
              href="https://wa.me/2348034699451"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent text-white font-bold text-sm tracking-[0.1em] uppercase px-10 py-5 glow-pulse hover:bg-accent-dim transition-colors duration-300"
              data-cursor="CHAT"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Open WhatsApp
            </a>
          </div>

          {/* Right: photo */}
          <div className="relative aspect-[3/4] overflow-hidden hidden md:block">
            <Image
              src="/images/esther-contact.jpg"
              alt="Esther Ozurumba"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 0px, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

        </div>
      </section>

      {/* Social links */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20 border-t border-white/5 pt-16">
        <div className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-semibold mb-8">Elsewhere</div>
        <ul className="space-y-0">
          {socialLinks.map((link, i) => (
            <li
              key={link.href}
              ref={(el) => { if (el) linksRef.current[i] = el }}
              className="border-b border-white/5 last:border-0"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 hover:bg-charcoal/30 px-2 -mx-2 transition-colors duration-300"
                data-cursor="VISIT"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display text-3xl md:text-4xl text-white group-hover:text-accent transition-colors duration-300">
                    {link.label.toUpperCase()}
                  </span>
                  <span className="text-white/20 text-xs tracking-[0.1em] hidden md:block">{link.desc}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs tracking-[0.1em] font-mono">{link.handle}</span>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Location */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20">
        <div className="flex items-center gap-3 text-white/20 text-xs tracking-[0.2em] uppercase">
          <span className="w-4 h-px bg-white/20" />
          <span>Based in Port Harcourt, Nigeria. Working with brands everywhere.</span>
        </div>
      </div>
    </div>
  )
}
