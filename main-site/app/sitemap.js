import { projects } from '@/lib/projects'
import { absoluteUrl } from '@/lib/site'

export default function sitemap() {
  const staticRoutes = [
    { path: '/', changeFrequency: 'monthly', priority: 1 },
    { path: '/projetos', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/sobre', changeFrequency: 'yearly', priority: 0.7 },
    { path: '/contato', changeFrequency: 'yearly', priority: 0.6 },
  ]

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency,
      priority,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projetos/${project.slug}`),
      changeFrequency: 'yearly',
      priority: 0.8,
      images: [absoluteUrl(project.image)],
    })),
  ]
}
