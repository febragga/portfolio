import { notFound } from 'next/navigation'
import { projects, formatLabel } from '@/lib/projects'
import { createSocialImage, socialImageSize } from '@/lib/social-image'

export const size = socialImageSize
export const contentType = 'image/png'

export default async function ProjectOpenGraphImage({ params }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) notFound()

  return createSocialImage({
    eyebrow: `PRJ—${String(project.id).padStart(2, '0')} · ${formatLabel(project.projectType)}`,
    title: project.title,
    detail: [project.location, project.year].filter((value) => value && !['-', '–', '—'].includes(String(value))).join(' · ') || project.description,
  })
}
