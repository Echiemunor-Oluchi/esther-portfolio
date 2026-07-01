'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const streakRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const counter = counterRef.current
    const textEl = textRef.current
    const streak = streakRef.current
    if (!container || !counter || !textEl || !streak) return

    const letters = textEl.querySelectorAll<HTMLSpanElement>('.letter')
    const tl = gsap.timeline()

    // Scramble entrance
    tl.fromTo(
      letters,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.6,
        ease: 'power3.out',
      }
    )

    // Counter
    const counterObj = { val: 0 }
    tl.to(
      counterObj,
      {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate() {
          setCount(Math.round(counterObj.val))
        },
      },
      '<0.2'
    )

    // Exit
    tl.to([letters, counter], {
      y: -60,
      opacity: 0,
      stagger: 0.03,
      duration: 0.5,
      ease: 'power3.in',
    })

    // Blue streak
    tl.fromTo(
      streak,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.4, ease: 'power3.inOut' }
    )
    tl.to(streak, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: 'power3.in' })

    // Wipe up
    tl.to(container, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete,
    })

    return () => { tl.kill() }
  }, [onComplete])

  const text = 'ESTHER OZURUMBA'

  return (
    <div
      ref={containerRef}
      className="preloader"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      {/* Blue streak */}
      <div
        ref={streakRef}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-accent z-10"
        style={{ transform: 'scaleX(0) translateY(-50%)' }}
      />

      {/* Main text */}
      <div className="flex flex-col items-center gap-6">
        <div ref={textRef} className="font-display text-[10vw] md:text-[7vw] text-white tracking-wider flex gap-0">
          {text.split('').map((char, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{ opacity: 0 }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </div>
        <div className="text-white/30 text-xs tracking-[0.3em] uppercase">
          Video Editor · Strategist
        </div>
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className="absolute bottom-8 right-10 font-display text-[8vw] text-white/10 leading-none tabular-nums"
      >
        {count.toString().padStart(3, '0')}
      </div>
    </div>
  )
}
