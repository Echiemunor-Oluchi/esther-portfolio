interface SectionLabelProps {
  children: React.ReactNode
  index?: string
  className?: string
}

export function SectionLabel({ children, index, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {index && (
        <span className="text-accent text-[10px] tracking-[0.2em] font-semibold">{index}</span>
      )}
      <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold">
        {children}
      </span>
      <span className="flex-1 h-px bg-white/10 max-w-12" />
    </div>
  )
}
