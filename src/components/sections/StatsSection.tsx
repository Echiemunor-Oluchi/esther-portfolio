'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 4, suffix: '+', label: 'Brands Served', description: 'From hair to health to finance' },
  { value: 2, suffix: '', label: 'Platforms', description: 'TikTok & Instagram Reels' },
  { value: 3, suffix: '', label: 'Service Lines', description: 'Edit · Strategy · Social' },
  { value: 100, suffix: '%', label: 'Cinematic', description: 'Every frame, intentional' },
]

function StatCard({ value, suffix, label, description, index }: typeof stats[0] & { index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!cardRef.current) return
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.5,
          ease: 'power2.out',
          delay: index * 0.1,
          onUpdate() {
            setCount(Math.round(obj.val))
          },
        })
        gsap.fromTo(
          cardRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: index * 0.1 }
        )
      },
    })
  }, [value, index])

  return (
    <div ref={cardRef} className="border-l border-white/10 pl-6 py-4" style={{ opacity: 0 }}>
      <div className="font-display text-[10vw] md:text-[5vw] text-white leading-none tabular-nums">
        {count}{suffix}
      </div>
      <div className="mt-2 text-white/80 text-xs font-semibold tracking-[0.1em] uppercase">{label}</div>
      <div className="mt-1 text-white/30 text-xs">{description}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="bg-off-black py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel index="03">By the Numbers</SectionLabel>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
