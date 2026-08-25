import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'
import ProjetoDetailClient from './projeto-detail-client'
import { absoluteUrl, serializeJsonLd, site, titled } from '@/lib/site'
import '@/styles/projeto-detalhes.css'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return {}
  const path = `/projetos/${project.slug}`
  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: titled(project.title),
      description: project.description,
      url: path,
      siteName: site.shortName,
      locale: site.locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: titled(project.title),
      description: project.description,
    },
  }
}

export default async function ProjetoDetail({ params }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) notFound()

  const currentIndex = projects.findIndex((item) => item.slug === slug)
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  const meaningful = (value) => value && !['-', '–', '—'].includes(String(value).trim())
  const projectUrl = absoluteUrl(`/projetos/${project.slug}`)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${projectUrl}#project`,
    url: projectUrl,
    name: project.title,
    description: project.description,
    image: absoluteUrl(project.image),
    dateCreated: meaningful(project.year) ? String(project.year) : undefined,
    genre: project.category,
    inLanguage: site.language,
    creator: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: 'Fernando Braga',
    },
    contentLocation: meaningful(project.location) ? project.location : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <ProjetoDetailClient
        project={project}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </>
  )
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
