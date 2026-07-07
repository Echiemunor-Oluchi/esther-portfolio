export interface Project {
  slug: string
  client: string
  tagline: string
  description: string
  role: string[]
  platform: 'TikTok' | 'Instagram'
  profileUrl: string
  videos: Array<{
    url: string
    title?: string
    description?: string
  }>
  tags: string[]
  coverColor: string
  featured: boolean
  hasGrowthSection?: boolean
  growthMetrics?: GrowthMetric[]
  strategyNarrative?: string
}

export interface GrowthMetric {
  label: string
  before: string
  after: string
  unit?: string
  prefix?: string
}

export const projects: Project[] = [
  {
    slug: 'makas-strands',
    client: "Maka's Strands",
    tagline: 'Cinematic hair content that stops the scroll.',
    description:
      "Maka's Strands is a hair ponytail brand for women who want the \"that girl\" look without the \"that girl\" price tag. The objective was twofold: make the styles aspirational enough that women could picture themselves wearing one, and accessible enough to turn that fantasy into a purchase. The campaign delivered on both fronts.",
    role: ['Video Editing'],
    platform: 'TikTok',
    profileUrl: 'https://www.tiktok.com/@makas.strands',
    videos: [
      {
        url: 'https://www.tiktok.com/@makas.strands/video/7518047819744201990',
        title: 'Product Drop: Strands Vol. I',
      },
      {
        url: 'https://www.tiktok.com/@makas.strands/video/7518412413478227256',
        title: 'Texture Study',
      },
      {
        url: 'https://www.tiktok.com/@makas.strands/video/7518456793564007685',
        title: 'The Ritual',
      },
    ],
    tags: ['Video Editing', 'Short Form', 'Brand Content'],
    coverColor: '#ffb6c1',
    featured: true,
    hasGrowthSection: true,
    growthMetrics: [
      { label: 'Videos Delivered', before: '0', after: '3', unit: '' },
      { label: 'Avg Views Per Video', before: 'N/A', after: '500+', unit: '' },
      { label: 'Engagement', before: 'NIL', after: 'Engagement was high', unit: '' },
      { label: 'Brand Feel', before: 'Not existing', after: 'Soft girl aesthetic', unit: '' },
    ],
    strategyNarrative: 'The brief was to make the product feel aspirational and the texture feel tactile. Every edit was made to hold attention, every transition timed to the beat.',
  },
  {
    slug: 'abdella',
    client: 'Abdella',
    tagline: 'App-first storytelling for a new-generation brand.',
    description:
      "Abdella is a new AI-powered nursing support platform, built by nurses, for nurses. I've edited videos that launched the platform in the health tech space and I'm currently developing an AI-sponsored campaign spotlighting the real healthcare challenges nurses face both at the bedside and beyond it and why the platform should be subscribed to by every nurse. Full case study coming soon.",
    role: ['Video Editing'],
    platform: 'TikTok',
    profileUrl: 'https://www.tiktok.com/@abdella.app',
    videos: [
      {
        url: 'https://www.tiktok.com/@abdella.app/video/7596999094124498194',
        title: 'Feature Reveal',
      },
      {
        url: 'https://www.tiktok.com/@abdella.app/video/7614656325502389512',
        title: 'User Stories',
      },
      {
        url: 'https://www.tiktok.com/@abdella.app/video/7612953767650086151',
        title: 'The Why',
      },
    ],
    tags: ['Video Editing', 'App Content', 'Short Form'],
    coverColor: '#6b21a8',
    featured: true,
    hasGrowthSection: true,
    growthMetrics: [
      { label: 'Videos Delivered', before: '0', after: '3', unit: '' },
      { label: 'Content Style', before: 'Basic', after: 'Cinematic', unit: '' },
      { label: 'Audience Fit', before: 'Unclear', after: 'Sharp', unit: '' },
      { label: 'Brand Consistency', before: 'Low', after: 'High', unit: '' },
    ],
    strategyNarrative: 'The goal was fast pacing, clean cuts, and a tone that speaks directly to the audience. No filler, all signal. Every edit was built to convert curiosity into action.',
  },
  {
    slug: 'her-flow-care',
    client: 'Her Flow Care',
    tagline: 'Health content made to feel personal and powerful.',
    description:
      "Her Flow Care is a menstrual care brand based in Port Harcourt, Nigeria, dedicated to helping women embrace the softness of womanhood. I partnered with the brand on their launch campaign, where the brief was clear: create enough warmth for women to talk about periods without shame, and enough polish to stop the scroll, hold attention, and convert desire into purchase. The campaign delivered exactly that.",
    role: ['Video Editing'],
    platform: 'TikTok',
    profileUrl: 'https://www.tiktok.com/@_herflowcare',
    videos: [
      {
        url: 'https://www.tiktok.com/@_herflowcare/video/7643418940571520277',
        title: 'Know Your Flow',
      },
    ],
    tags: ['Video Editing', 'Wellness', 'Short Form'],
    coverColor: '#9d174d',
    featured: false,
    hasGrowthSection: true,
    growthMetrics: [
      { label: 'Videos Delivered', before: '0', after: '1', unit: '' },
      { label: 'Content Tone', before: 'Generic', after: 'Personal', unit: '' },
      { label: 'Trust Signal', before: 'Weak', after: 'Strong', unit: '' },
      { label: 'Scroll Stop Rate', before: 'Low', after: 'High', unit: '' },
    ],
    strategyNarrative: 'The edit had to feel like a conversation, not an ad. Warm and intimate enough to earn trust, sharp enough to hold a TikTok feed.',
  },
  {
    slug: 'youth-mama-mentors',
    client: 'Youth Mama Mentors',
    tagline: 'From zero to a community. Built with strategy and story.',
    description:
      "Youth Mama Mentors is a faith-based mentorship platform for engaged and married couples committed to building happy, lasting relationships. The goal here wasn't to sell — it was to earn attention: content designed to make couples pause mid-scroll, reflect honestly on their own relationship, and return because they'd found a trusted source of guidance for the long haul.",
    role: ['Video Editing', 'Content Strategy'],
    platform: 'Instagram',
    profileUrl: 'https://www.instagram.com/youthmama_mentors',
    videos: [
      {
        url: 'https://www.instagram.com/reel/DYcodLiNtcb/',
        title: 'Community Story',
      },
      {
        url: 'https://www.instagram.com/reel/DZSuQFaRd9Z/',
        title: 'Mentor Feature',
      },
      {
        url: 'https://www.instagram.com/reel/DXCEmCRAewy/',
        title: 'The Mission',
      },
    ],
    tags: ['Video Editing', 'Content Strategy', 'Instagram Reels', 'Community Building'],
    coverColor: '#ea580c',
    featured: true,
    hasGrowthSection: true,
    growthMetrics: [
      { label: 'Followers', before: '135', after: '200', unit: '' },
      { label: 'Posts Published', before: '13', after: '18', unit: '' },
      { label: 'Monthly Views', before: '140', after: '1,700', unit: '' },
      { label: 'Content Quality', before: 'Basic', after: 'Cinematic', unit: '' },
    ],
    strategyNarrative: "The strategy behind Youth Mama Mentors wasn't about posting more. It was about posting with purpose. Every piece of content was mapped to a specific audience emotion: validation, aspiration, community, and action. By leading with real stories and keeping the editing tight and human, each reel earned its watch time. The account growth followed naturally from content people actually wanted to share.",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const idx = projects.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}
