'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouch) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power3.out' })
    }

    const raf = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX, y: ringY })
      gsap.set(label, { x: ringX, y: ringY })
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const cursorLabel = target.dataset.cursor || ''
      gsap.to(ring, {
        width: 70,
        height: 70,
        borderColor: '#2563FF',
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, { background: '#2563FF', duration: 0.2 })
      if (cursorLabel) {
        label.textContent = cursorLabel
        gsap.to(label, { opacity: 1, duration: 0.2 })
        gsap.to(dot, { width: 0, height: 0, duration: 0.2 })
      }
    }

    const onLeaveInteractive = () => {
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: 'rgba(255,255,255,0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, { background: '#FFFFFF', width: 8, height: 8, duration: 0.2 })
      gsap.to(label, { opacity: 0, duration: 0.15 })
    }

    document.addEventListener('mousemove', onMove)

    const interactiveEls = document.querySelectorAll(
      'a, button, [data-cursor], input, textarea, select, [role="button"]'
    )
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive as EventListener)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive as EventListener)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label text-[9px] font-bold tracking-[0.15em]" />
    </div>
  )
}
