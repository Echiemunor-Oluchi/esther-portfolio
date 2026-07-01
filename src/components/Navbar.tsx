'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-wider text-white hover:text-accent transition-colors duration-300"
          >
            EO
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 pb-0.5 ${
                  pathname === link.href ? 'text-accent' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[9999] w-8 h-8 flex flex-col justify-center items-end gap-1.5 group"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-px bg-white transition-all duration-300 ${
                isOpen ? 'w-6 rotate-45 translate-y-[5px]' : 'w-6'
              }`}
            />
            <span
              className={`block h-px bg-white transition-all duration-300 ${
                isOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-4 group-hover:w-6'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-[9989] flex flex-col justify-center items-start px-8 md:px-16"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
                    className={`block font-display text-[12vw] md:text-[8vw] leading-none hover:text-accent transition-colors duration-300 ${
                      pathname === link.href ? 'text-accent' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-10 left-8 md:left-16 text-white/40 text-xs tracking-[0.2em] uppercase"
            >
              Port Harcourt, Nigeria
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
