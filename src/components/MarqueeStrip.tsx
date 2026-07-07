'use client'

interface MarqueeStripProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export function MarqueeStrip({ items, speed = 20, direction = 'left', className = '' }: MarqueeStripProps) {
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden py-4 border-y border-taupe/5 ${className}`}>
      <div
        className="flex gap-12 w-max"
        style={{
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 text-espresso/20 text-xs tracking-[0.3em] uppercase font-semibold whitespace-nowrap"
          >
            <span>{item}</span>
            <span className="text-terracotta">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
