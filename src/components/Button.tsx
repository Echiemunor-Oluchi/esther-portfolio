'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  className?: string
  external?: boolean
  cursorLabel?: string
}

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  external = false,
  cursorLabel,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-semibold text-xs tracking-[0.15em] uppercase px-8 py-4 transition-all duration-300 relative overflow-hidden group'

  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-dim',
    ghost: 'text-white/80 hover:text-white border-b border-white/20 hover:border-accent px-0 py-1',
    outline: 'border border-white/20 text-white hover:border-accent hover:text-accent',
  }

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          data-cursor={cursorLabel}
          {...motionProps}
        >
          {children}
        </motion.a>
      )
    }
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={cls} data-cursor={cursorLabel}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button onClick={onClick} className={cls} data-cursor={cursorLabel} {...motionProps}>
      {children}
    </motion.button>
  )
}
