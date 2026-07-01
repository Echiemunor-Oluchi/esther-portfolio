'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedHeadingProps {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4'
  triggerOnScroll?: boolean
  delay?: number
}

export function AnimatedHeading({
  text,
  className = '',
  tag: Tag = 'h2',
  triggerOnScroll = true,
  delay = 0,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll<HTMLSpanElement>('.word')
    const wrappers = el.querySelectorAll<HTMLSpanElement>('.word-wrapper')

    gsap.set(words, { y: '110%' })

    const animate = () => {
      gsap.to(words, {
        y: '0%',
        stagger: 0.06,
        duration: 0.9,
        ease: 'power3.out',
        delay,
      })
    }

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: animate,
      })
    } else {
      animate()
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill()
      })
    }
  }, [triggerOnScroll, delay])

  const words = text.split(' ')

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-wrapper inline-block overflow-hidden mr-[0.25em] last:mr-0"
        >
          <span className="word inline-block">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}
