import Link from 'next/link'
import Image from 'next/image'
import { projects, formatLabel } from '@/lib/projects'
import TechnicalField from '@/components/technical-field'
import { pageMetadata } from '@/lib/site'
import '@/styles/home.css'

export const metadata = pageMetadata({
  title: 'Projetos de arquitetura, urbanismo e visualização',
  description: 'Portfólio de Fernando Braga com projetos de arquitetura, desenho técnico, visualização, urbanismo e investigação espacial.',
  path: '/',
})

const selectedSlugs = [
  'estudio-a',
  'casa-do-lago',
  'biblioteca-aml',
  'objetos-3d',
  'escola-lele',
  'projeto-da-paisagem',
]

export default function HomePage() {
  const selectedProjects = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean)
  const featured = selectedProjects[0]

  return (
    <main id="conteudo" className="home">
      <section className="home-hero">
        <TechnicalField />
        <div className="home-hero__gridlines" aria-hidden="true" />

        <div className="site-grid grid-12 home-hero__layout">
          <div className="home-intro">
            <span className="technical-label technical-label--blue section-index">Arquivo 2024—26</span>
            <img className="home-intro__signature" src="/assinatura.svg" alt="Fernando Braga" />
            <h1>Arquitetura, computação e representação.</h1>
            <p>
              Uma seleção de projetos entre desenho técnico, visualização, urbanismo e investigação espacial.
            </p>
          </div>

          <Link href={`/projetos/${featured.slug}`} className="featured-project">
            <div className="featured-project__image-wrap">
              <Image
                src={featured.image}
                alt={featured.title}
                className="featured-project__image"
                fill
                priority
                quality={88}
                sizes="(max-width: 820px) 100vw, 62vw"
              />
              <span className="featured-project__coordinate technical-label" aria-hidden="true">23°33′S / 46°38′W</span>
            </div>
            <div className="featured-project__caption">
              <div>
                <span className="technical-label technical-label--blue">Projeto em destaque · 01</span>
                <h2>{featured.title}</h2>
              </div>
              <div className="featured-project__meta technical-label">
                <span>{formatLabel(featured.projectType)}</span>
                <span>{featured.year}</span>
                <span>Abrir projeto ↗</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-selected site-grid" aria-labelledby="selected-title">
        <header className="home-section-header grid-12">
          <div className="home-section-header__label">
            <span className="technical-label section-index">01 · Seleção</span>
          </div>
          <div className="home-section-header__title">
            <h2 id="selected-title">Trabalhos selecionados</h2>
            <p>Arquitetura, objetos, visualização e pesquisa reunidos como um arquivo em construção.</p>
          </div>
        </header>

        <div className="selected-grid">
          {selectedProjects.slice(1).map((project, index) => (
            <Link
              href={`/projetos/${project.slug}`}
              className={`selected-project selected-project--${index + 1}`}
              data-slug={project.slug}
              key={project.slug}
            >
              <div className="selected-project__media">
                <Image
                  src={project.thumbnail}
                  alt=""
                  fill
                  loading="lazy"
                  quality={82}
                  sizes="(max-width: 820px) 100vw, 62vw"
                />
                <span className="selected-project__open" aria-hidden="true">↗</span>
              </div>
              <div className="selected-project__caption">
                <span className="selected-project__index technical-label">{String(index + 2).padStart(2, '0')}</span>
                <h3>{project.title}</h3>
                <div className="selected-project__meta technical-label">
                  <span>{formatLabel(project.category)}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="archive-entry grid-12">
          <div className="archive-entry__number">12</div>
          <div className="archive-entry__copy">
            <span className="technical-label technical-label--blue">Arquivo completo</span>
            <h2>Todos os projetos, organizados por natureza, tipologia, ano e local.</h2>
            <Link href="/projetos" className="text-link">Explorar o arquivo</Link>
          </div>
        </div>
      </section>

      <section className="home-about site-grid grid-12" aria-labelledby="home-about-title">
        <div className="home-about__label">
          <span className="technical-label section-index">02 · Autor</span>
        </div>
        <div className="home-about__copy">
          <h2 id="home-about-title">Entre a precisão do desenho e a atmosfera da imagem.</h2>
          <p>
            Fernando Braga estuda Arquitetura e Urbanismo na Universidade de São Paulo, articulando formação em computação gráfica, modelagem 3D e projeto arquitetônico.
          </p>
          <Link href="/sobre" className="text-link">Conhecer a trajetória</Link>
        </div>
      </section>

      <section className="home-contact site-grid grid-12" aria-labelledby="home-contact-title">
        <span className="technical-label section-index home-contact__label">03 · Contato</span>
        <div className="home-contact__copy">
          <h2 id="home-contact-title">Projetos, colaborações e conversas.</h2>
          <a href="mailto:contato@fernandobragaportfolio.com.br" className="home-contact__email">
            contato@fernandobragaportfolio.com.br
          </a>
        </div>
      </section>
    </main>
  )
}
