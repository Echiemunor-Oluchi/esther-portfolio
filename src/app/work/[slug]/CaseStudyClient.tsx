'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/data/projects'
import { VideoEmbed } from '@/components/VideoEmbed'
import { GrowthMetrics } from '@/components/GrowthMetrics'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  project: Project
  adjacent: { prev: Project | null; next: Project | null }
}

const platformIcon = (platform: 'TikTok' | 'Instagram') =>
  platform === 'TikTok' ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.83a4.85 4.85 0 01-1.01-.14z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )

export function CaseStudyClient({ project, adjacent }: Props) {
  const heroRef = useRef<HTMLElement>(null)
  const videosRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!heroRef.current) return
    const words = heroRef.current.querySelectorAll('.word')
    gsap.set(words, { y: '110%' })
    gsap.to(words, {
      y: '0%',
      stagger: 0.07,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.15,
    })

    // Video reveal on scroll
    videosRef.current.filter(Boolean).forEach((el, i) => {
      gsap.fromTo(
        el,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-10 max-w-[1400px] mx-auto overflow-hidden"
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${project.coverColor}33 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/work"
              className="text-espresso/30 hover:text-espresso text-[10px] tracking-[0.25em] uppercase font-semibold transition-colors duration-300"
            >
              Work
            </Link>
            <span className="text-espresso/20">/</span>
            <span className="text-terracotta text-[10px] tracking-[0.25em] uppercase font-semibold">
              {project.client}
            </span>
          </div>

          <h1 className="font-display leading-none text-espresso">
            {project.client.toUpperCase().split(' ').map((word, i) => (
              <div key={i} className="overflow-hidden block">
                <span
                  className="word inline-block"
                  style={{ fontSize: 'clamp(3rem, 12vw, 11rem)' }}
                >
                  {word}
                </span>
              </div>
            ))}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={project.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-terracotta text-xs tracking-[0.15em] uppercase font-semibold border border-terracotta/30 px-4 py-2 hover:bg-terracotta hover:text-cream transition-all duration-300"
            >
              {platformIcon(project.platform)}
              View on {project.platform}
            </a>
            {project.role.map((r) => (
              <span key={r} className="text-espresso/30 text-[10px] tracking-[0.2em] uppercase border border-taupe/10 px-3 py-1.5">
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-taupe/15 mx-6 md:mx-10" />

      {/* Description */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <SectionLabel>About This Project</SectionLabel>
            <p className="mt-6 text-espresso/60 text-sm md:text-base leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-espresso/20 text-[9px] tracking-[0.25em] uppercase mb-2">Platform</div>
              <div className="text-espresso font-semibold text-sm">{project.platform}</div>
            </div>
            <div>
              <div className="text-espresso/20 text-[9px] tracking-[0.25em] uppercase mb-2">Role</div>
              <div className="text-espresso font-semibold text-sm">{project.role.join(', ')}</div>
            </div>
            <div>
              <div className="text-espresso/20 text-[9px] tracking-[0.25em] uppercase mb-2">Videos</div>
              <div className="text-espresso font-semibold text-sm">{project.videos.length}</div>
            </div>
            <div>
              <div className="text-espresso/20 text-[9px] tracking-[0.25em] uppercase mb-2">Content Type</div>
              <div className="text-espresso font-semibold text-sm">Short Form</div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-16 md:pb-24">
        <SectionLabel>The Work</SectionLabel>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {project.videos.map((video, i) => (
            <div
              key={video.url}
              ref={(el) => { if (el) videosRef.current[i] = el }}
            >
              {video.title && (
                <div className="mb-3 text-espresso/30 text-[10px] tracking-[0.2em] uppercase font-semibold">
                  {String(i + 1).padStart(2, '0')}. {video.title}
                </div>
              )}
              <VideoEmbed
                url={video.url}
                title={video.title}
                platform={project.platform}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Growth metrics (Youth Mama Mentors only) */}
      {project.hasGrowthSection && project.growthMetrics && (
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto border-t border-taupe/5">
          <GrowthMetrics
            metrics={project.growthMetrics}
            narrative={project.strategyNarrative}
          />
        </section>
      )}

      {/* Next project */}
      <div className="border-t border-taupe/5 mt-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            {adjacent.prev && (
              <Link
                href={`/work/${adjacent.prev.slug}`}
                className="group flex flex-col gap-2"
              >
                <span className="text-espresso/20 text-[9px] tracking-[0.25em] uppercase">← Previous</span>
                <span className="font-display text-3xl md:text-5xl text-espresso/40 group-hover:text-espresso transition-colors duration-300">
                  {adjacent.prev.client.toUpperCase()}
                </span>
              </Link>
            )}
            {adjacent.next && (
              <Link
                href={`/work/${adjacent.next.slug}`}
                className="group flex flex-col gap-2 sm:text-right"
              >
                <span className="text-espresso/20 text-[9px] tracking-[0.25em] uppercase">Next →</span>
                <span className="font-display text-3xl md:text-5xl text-espresso/40 group-hover:text-espresso transition-colors duration-300">
                  {adjacent.next.client.toUpperCase()}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
