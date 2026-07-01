'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/SectionLabel'
import { MarqueeStrip } from '@/components/MarqueeStrip'

gsap.registerPlugin(ScrollTrigger)

const process = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Understanding the brand, the audience, and what\'s already resonating. Before a single frame is touched.',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'Mapping out the content direction: what story to tell, how to pace it, and why this particular edit should exist.',
  },
  {
    num: '03',
    title: 'Edit',
    desc: 'Every cut is intentional. Pacing, music, transitions all made to hold attention from frame one to the very last.',
  },
  {
    num: '04',
    title: 'Review',
    desc: 'Refinement until it feels right. The goal is a final product you\'re proud to post.',
  },
]

const skills = [
  'Video Editing',
  'Video Strategy',
  'Social Media Strategy',
  'Short Form Content',
  'Brand Storytelling',
  'TikTok',
  'Instagram Reels',
  'Content Direction',
]

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const skillsRef = useRef<HTMLDivElement>(null)

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

    // Vertical timeline line draw
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
          },
        }
      )
    }

    // Step reveals
    stepsRef.current.filter(Boolean).forEach((step, i) => {
      gsap.fromTo(
        step,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Skills
    if (skillsRef.current) {
      const badges = skillsRef.current.querySelectorAll('.skill-badge')
      gsap.fromTo(
        badges,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-28 md:pt-36 pb-16 px-6 md:px-10 max-w-[1400px] mx-auto"
      >
        <SectionLabel>About</SectionLabel>
        <div className="mt-4 overflow-visible">
          <h1 className="font-display text-[18vw] md:text-[12vw] leading-none text-white">
            {['ESTHER', 'OZURUMBA'].map((word, i) => (
              <div key={i} className="overflow-hidden block">
                <span className="word inline-block">{word}</span>
              </div>
            ))}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
              <Image
                src="/images/esther-headshot.jpg"
                alt="Esther Ozurumba, Video Editor & Strategist"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 border border-accent/10" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent px-4 py-3">
              <div className="text-white text-[9px] tracking-[0.25em] uppercase font-semibold">
                Port Harcourt, Nigeria
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-5xl md:text-6xl text-white leading-tight">
                MY NAME IS<br />
                <span className="text-accent">ESTHER</span><br />
                OZURUMBA.
              </h2>
            </div>

            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>
                I am a video editor and strategist based in Port Harcourt, Nigeria. I work at the intersection of craft and strategy, specializing in cinematic short form content for brands and creators across TikTok and Instagram.
              </p>
              <p>
                My approach goes beyond the edit. I think through the story behind the content: what gets posted, why it gets posted, and how it connects with the people watching.
              </p>
              <p>
                From hair brands to wellness platforms to growing creator accounts, my work carries a consistent signature: intentional pacing, clean cuts, and a cinematic feel that holds attention in a feed built to steal it.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/2348034699451"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white font-bold text-xs tracking-[0.12em] uppercase px-6 py-3 hover:bg-accent-dim transition-colors duration-300"
              >
                Work With Me
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 border border-white/20 text-white/60 hover:border-white/50 hover:text-white font-semibold text-xs tracking-[0.12em] uppercase px-6 py-3 transition-all duration-300"
              >
                See the Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip items={skills} className="bg-off-black" />

      {/* Process */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto py-20 md:py-32">
        <SectionLabel>My Process</SectionLabel>
        <h2 className="font-display text-[10vw] md:text-[6vw] text-white mt-4 mb-16 leading-none">
          HOW I WORK
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-[11rem] top-0 bottom-0 w-px bg-accent/40 hidden md:block"
            style={{ transformOrigin: 'top center' }}
          />

          <div className="space-y-0">
            {process.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { if (el) stepsRef.current[i] = el }}
                className="flex gap-6 md:gap-16 items-start py-10 md:py-12 border-b border-white/5 last:border-0"
              >
                <div className="flex-shrink-0 w-12 md:w-40 flex md:justify-end md:pr-10">
                  <span className="font-display text-5xl md:text-6xl text-white/10 leading-none">{step.num}</span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-display text-3xl md:text-4xl text-white mb-3">{step.title.toUpperCase()}</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20 md:pb-32">
        <SectionLabel>Skills & Services</SectionLabel>
        <div ref={skillsRef} className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="skill-badge border border-white/20 text-white/60 text-[10px] tracking-[0.15em] uppercase px-4 py-2 hover:border-accent hover:text-accent transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
