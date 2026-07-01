import { notFound } from 'next/navigation'
import { getProjectBySlug, getAdjacentProjects, projects } from '@/data/projects'
import { CaseStudyClient } from './CaseStudyClient'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.client} | Esther Ozurumba`,
    description: project.tagline,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const adjacent = getAdjacentProjects(slug)

  return <CaseStudyClient project={project} adjacent={adjacent} />
}
