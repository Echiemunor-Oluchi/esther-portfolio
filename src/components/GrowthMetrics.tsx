'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { GrowthMetric } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

interface GrowthMetricsProps {
  metrics: GrowthMetric[]
  narrative?: string
}

export function GrowthMetrics({ metrics, narrative }: GrowthMetricsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return
    const cards = cardsRef.current.filter(Boolean)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
    )

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={sectionRef} className="py-20 md:py-32">
      {/* Section header */}
      <div className="mb-16">
        <span className="text-accent text-xs tracking-[0.3em] uppercase font-semibold">The Strategy Behind the Growth</span>
        <h2 className="font-display text-[12vw] md:text-[7vw] text-white mt-2 leading-none">
          GROWTH IN NUMBERS
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            ref={(el) => { if (el) cardsRef.current[i] = el }}
            className="bg-off-black p-8 md:p-10"
          >
            <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-6">{metric.label}</div>

            {/* Before / After */}
            <div className="space-y-4">
              <div>
                <div className="text-white/20 text-[10px] tracking-[0.15em] uppercase mb-1">Before</div>
                <div className="font-display text-3xl text-white/30">
                  {metric.prefix}{metric.before}{metric.unit}
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-accent/50 to-transparent" />
              <div>
                <div className="text-accent text-[10px] tracking-[0.15em] uppercase mb-1">After</div>
                <div className="font-display text-4xl text-accent">
                  {metric.prefix}{metric.after}{metric.unit}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Narrative */}
      {narrative && (
        <div className="mt-16 max-w-2xl">
          <p className="text-white/50 text-sm md:text-base leading-relaxed">
            {narrative.split('\n')[0]}
          </p>
        </div>
      )}
    </div>
  )
}
