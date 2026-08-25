'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProjectGallery from '@/components/projectgallery'
import { formatLabel } from '@/lib/projects'

const isMeaningful = (value) => {
  const normalized = String(value ?? '').trim()
  return normalized && !['-', '–', '—'].includes(normalized)
}

function PortfolioImage({ src, alt = '', quality, sizes, priority = false }) {
  return <Image src={src} alt={alt} fill priority={priority} loading={priority ? 'eager' : 'lazy'} quality={quality} sizes={sizes} />
}

const getEditorialType = (project) => {
  if (project.slug === 'objetos-3d') return 'object'
  if (['biblioteca-aml', 'escola', 'desenhos'].includes(project.slug)) return 'research'
  if (project.slug === 'projeto-da-paisagem') return 'computational'
  if (project.slug === 'terracota') return 'visualization'
  return 'architecture'
}

export default function ProjetoDetailClient({ project, previousProject, nextProject }) {
  const projectNumber = String(project.id).padStart(2, '0')
  const [atlasSection, setAtlasSection] = useState({ section: '01', label: 'Abertura' })
  const editorialType = getEditorialType(project)
  const metadata = [
    ['Ano', project.year],
    ['Local', project.location],
    ['Tipologia', formatLabel(project.category)],
    ['Status', formatLabel(project.status)],
  ].filter(([, value]) => isMeaningful(value) && value !== 'Sem localização')

  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-atlas-section]')]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))

      if (!visible.length) return
      const target = visible[0].target
      setAtlasSection({ section: target.dataset.atlasSection, label: target.dataset.atlasLabel })
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('atlas-section-change', {
        detail: { project: projectNumber, ...atlasSection },
      }))
    })
    return () => window.cancelAnimationFrame(frame)
  }, [atlasSection, projectNumber])

  return (
    <main id="conteudo" className={`case-study case-study--${editorialType}`} data-atlas-project={projectNumber}>
      <header className="case-opening site-grid" data-atlas-section="01" data-atlas-label="Abertura">
        <div className="case-opening__top grid-12">
          <Link href="/projetos" className="case-back">
            <span aria-hidden="true">←</span> Arquivo de projetos
          </Link>
          <span className="case-coordinate technical-label">PRJ—{projectNumber} · 23°33′S / 46°38′W</span>
        </div>

        <div className="case-opening__title grid-12">
          <div className="case-number" aria-hidden="true">{projectNumber}</div>
          <div className="case-title-block">
            <span className="technical-label technical-label--blue">{formatLabel(project.projectType)}</span>
            <h1>{project.title}</h1>
          </div>
          <dl className="case-meta">
            {metadata.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{label === 'Local' ? String(value).toUpperCase() : value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <figure className="case-hero">
        <div className="case-hero__media">
          <PortfolioImage
            src={project.image}
            alt={project.title}
            quality={90}
            sizes="100vw"
            priority
          />
        </div>
        <figcaption className="site-grid technical-label">
          <span>Imagem de abertura</span>
          <span>Arquivo PRJ—{projectNumber}</span>
        </figcaption>
      </figure>

      <div className="case-body site-grid">
        <section className="case-intro grid-12" aria-labelledby="case-concept-title" data-atlas-section="02" data-atlas-label="Contexto">
          <div className="case-intro__label">
            <span className="technical-label section-index">02 · Contexto</span>
          </div>
          <div className="case-intro__lead">
            <h2 id="case-concept-title">{project.description}</h2>
          </div>
          <div className="case-intro__text">
            <p>{project.content}</p>
          </div>
        </section>

        <ProjectGallery
          gallery={project.gallery}
          projectNumber={projectNumber}
          initialIndex={project.slug === 'objetos-3d' ? 1 : 0}
        />
      </div>

      <nav className={`case-pagination site-grid ${!previousProject || !nextProject ? 'case-pagination--single' : ''}`} aria-label="Navegação entre projetos">
        {previousProject ? (
          <Link href={`/projetos/${previousProject.slug}`} className="case-pagination__item case-pagination__item--previous">
            <PortfolioImage src={previousProject.thumbnail} quality={80} sizes="(max-width: 820px) 100vw, 42vw" />
            <span className="technical-label">← Projeto anterior · {String(previousProject.id).padStart(2, '0')}</span>
            <strong>{previousProject.title}</strong>
            <small className="technical-label">{formatLabel(previousProject.category)} · {isMeaningful(previousProject.year) ? previousProject.year : formatLabel(previousProject.projectType)}</small>
          </Link>
        ) : <span />}

        {nextProject ? (
          <Link href={`/projetos/${nextProject.slug}`} className="case-pagination__item case-pagination__item--next">
            <PortfolioImage src={nextProject.thumbnail} quality={82} sizes="(max-width: 820px) 100vw, 58vw" />
            <span className="technical-label">{String(nextProject.id).padStart(2, '0')} · Próximo projeto →</span>
            <strong>{nextProject.title}</strong>
            <small className="technical-label">{formatLabel(nextProject.category)} · {isMeaningful(nextProject.year) ? nextProject.year : formatLabel(nextProject.projectType)}</small>
          </Link>
        ) : <span />}
      </nav>

      <section className="case-contact site-grid grid-12" aria-labelledby="case-contact-title" data-atlas-section="04" data-atlas-label="Contato">
        <span className="technical-label section-index">04 · Contato</span>
        <div>
          <h2 id="case-contact-title">Conversar sobre este trabalho.</h2>
          <a href="mailto:contato@fernandobragaportfolio.com.br" className="text-link">Enviar e-mail</a>
        </div>
      </section>
    </main>
  )
}
