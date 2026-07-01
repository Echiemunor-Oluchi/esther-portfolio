'use client'

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="noise-container fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 9998 }}
    />
  )
}
