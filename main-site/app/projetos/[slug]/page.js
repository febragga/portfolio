import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProjectBySlug } from '@/lib/projects'
import ProjectGallery from '@/components/projectgallery'
import '@/styles/projeto-detalhes.css'

export default async function ProjetoDetail({ params }) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  // Encontrar próximo e anterior projeto
  const currentIndex = projects.findIndex(p => p.slug === params.slug)
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <main className="projeto-detalhes">
      {/* HEADER COM VOLTA */}
      <div className="projeto-header">
        <Link href="/projetos" className="back-link">
          ← Voltar para projetos
        </Link>
      </div>

      {/* IMAGEM PRINCIPAL */}
      <div className="projeto-hero">
        <img
          src={project.image}
          alt={project.title}
          className="hero-image"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="projeto-content-wrapper">
        <div className="projeto-content">
          {/* TÍTULO E METADADOS */}
          <div className="projeto-info">
            <h1>{project.title}</h1>
            
            <div className="projeto-metadata">
              <div className="meta-item">
                <span className="meta-label">Localização</span>
                <span className="meta-value">{project.location}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Ano</span>
                <span className="meta-value">{project.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Tipo</span>
                <span className="meta-value">{project.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value">{project.status}</span>
              </div>
            </div>

            <div className="projeto-description">
              <p>{project.description}</p>
            </div>
          </div>

          {/* CONTEÚDO ADICIONAL */}
          <div className="projeto-body">
            <p>{project.content}</p>
          </div>
        </div>

        {/* GALERIA DO PROJETO */}
        <ProjectGallery gallery={project.gallery} />
      </div>

      {/* NAVEGAÇÃO ANTERIOR/PRÓXIMO */}
      <div className="projeto-navigation">
        {previousProject ? (
          <Link href={`/projetos/${previousProject.slug}`} className="nav-link prev">
            <span className="nav-arrow">←</span>
            <span className="nav-text">
              <span className="nav-label">Anterior</span>
              <span className="nav-title">{previousProject.title}</span>
            </span>
          </Link>
        ) : (
          <div></div>
        )}

        {nextProject ? (
          <Link href={`/projetos/${nextProject.slug}`} className="nav-link next">
            <span className="nav-text">
              <span className="nav-label">Próximo</span>
              <span className="nav-title">{nextProject.title}</span>
            </span>
            <span className="nav-arrow">→</span>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </main>
  )
}

// Gerar estaticamente as páginas dos projetos
export async function generateStaticParams() {
  return projects.map(project => ({
    slug: project.slug,
  }))
}