'use client'

import { useState } from 'react'

interface VideoEmbedProps {
  url: string
  title?: string
  platform: 'TikTok' | 'Instagram'
}

function extractTikTokId(url: string): string | null {
  const match = url.match(/video\/(\d+)/)
  return match ? match[1] : null
}

function extractInstagramId(url: string): string | null {
  const match = url.match(/reel\/([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

export function VideoEmbed({ url, title, platform }: VideoEmbedProps) {
  const [embedFailed, setEmbedFailed] = useState(false)

  const tiktokId = platform === 'TikTok' ? extractTikTokId(url) : null
  const instagramId = platform === 'Instagram' ? extractInstagramId(url) : null

  // Fallback card
  if (embedFailed || (!tiktokId && !instagramId)) {
    return (
      <ExternalVideoCard url={url} title={title} platform={platform} />
    )
  }

  if (platform === 'TikTok' && tiktokId) {
    return (
      <div className="relative w-full aspect-[9/16] max-w-xs mx-auto rounded-none overflow-hidden bg-white">
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id={tiktokId}
          style={{ maxWidth: '100%', minWidth: 'unset' }}
        >
          <ExternalVideoCard url={url} title={title} platform={platform} />
        </blockquote>
        <script async src="https://www.tiktok.com/embed.js" />
      </div>
    )
  }

  if (platform === 'Instagram' && instagramId) {
    return (
      <div className="relative w-full max-w-sm mx-auto bg-white overflow-hidden">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ width: '100%', minWidth: 'unset', margin: 0 }}
        >
          <ExternalVideoCard url={url} title={title} platform={platform} />
        </blockquote>
        <script async src="//www.instagram.com/embed.js" />
      </div>
    )
  }

  return <ExternalVideoCard url={url} title={title} platform={platform} />
}

function ExternalVideoCard({
  url,
  title,
  platform,
}: {
  url: string
  title?: string
  platform: 'TikTok' | 'Instagram'
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden bg-white border border-taupe/10 hover:border-terracotta/50 transition-colors duration-300"
      data-cursor="WATCH"
    >
      {/* Placeholder visual */}
      <div className="aspect-[9/16] max-w-xs w-full mx-auto flex flex-col items-center justify-center gap-4 p-6 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose/5 to-transparent" />

        {/* Platform icon */}
        <div className="relative z-10">
          {platform === 'TikTok' ? (
            <svg viewBox="0 0 24 24" fill="#2B231C" className="w-12 h-12 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.83a4.85 4.85 0 01-1.01-.14z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="#2B231C" className="w-12 h-12 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          )}
        </div>

        {/* Play button */}
        <div className="relative z-10 w-14 h-14 rounded-full border border-terracotta/50 flex items-center justify-center group-hover:border-terracotta group-hover:bg-terracotta/10 transition-all duration-300">
          <svg className="w-5 h-5 text-terracotta ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>

        {/* Title */}
        {title && (
          <div className="relative z-10 text-center">
            <p className="text-espresso/60 text-xs tracking-[0.1em] uppercase font-medium">{title}</p>
          </div>
        )}

        {/* Watch link */}
        <div className="relative z-10 flex items-center gap-2 text-terracotta text-xs tracking-[0.1em] uppercase font-semibold mt-2">
          <span>Watch on {platform}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </a>
  )
}
