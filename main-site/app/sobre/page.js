import '@/styles/sobre.css'
import { pageMetadata } from '@/lib/site'

const trajectory = [
  {
    year: '2018',
    title: 'IFTM',
    subtitle: 'Computação Gráfica',
    description: 'Nasci em Uberlândia. Em 2018 realizei o exame para ingresso no Curso de Computação Gráfica integrado ao Ensino Médio do Instituto Federal do Triângulo Mineiro (IFTM), formando-me em 2020. Foram anos de muito aprendizado em programação, modelagem 3D e design.',
    image: '/database/images/iftm-horizontal-uberlandiacentro.png',
    fit: 'contain',
    logoWidth: '88%',
  },
  {
    year: '2020',
    title: 'UFSCar',
    subtitle: 'Física',
    description: 'Após o ensino médio, cursei brevemente física na Universidade Federal de São Carlos (UFSCar). Em 2023, percebi que sentia falta das atividades técnicas que realizava durante o curso, como programação e modelagem 3D.',
    image: '/database/images/Ufscar-logo.png',
    fit: 'contain',
    logoWidth: '54%',
  },
  {
    year: '2023',
    title: 'USP',
    subtitle: 'Arquitetura e Urbanismo',
    description: 'Sendo assim, ingressei na Universidade de São Paulo (USP), na capital, onde resido e curso atualmente Arquitetura e Urbanismo. Uma decisão que combina minha paixão por design com a visão de futuro.',
  },
]

const capabilities = [
  { index: '01', title: 'Projeto & BIM', tools: 'ArchiCAD · Revit · AutoCAD · SketchUp · Rhino' },
  { index: '02', title: 'Modelagem & Visualização', tools: 'Blender · 3ds Max · V-Ray · Enscape' },
  { index: '03', title: 'Representação', tools: 'Photoshop · Illustrator · InDesign' },
  { index: '04', title: 'Território & Mídia', tools: 'QGIS · Premiere Pro · After Effects' },
]

const certificates = [
  { index: '01', name: 'Certificado Método Cura', issuer: 'Curso Cura', date: '28 de setembro de 2025', href: '/docs/certificado-metodo-cura.pdf' },
  { index: '02', name: 'Certificado Archicad Cura', issuer: 'Curso Cura', date: '22 de fevereiro de 2026', href: '/docs/certificado-archicad-cura.pdf' },
  { index: '03', name: 'Curriculum Vitae', issuer: 'Atualizado em', date: '25 de fevereiro de 2026', href: '/docs/CV.pdf' },
]

export const metadata = pageMetadata({
  title: 'Sobre',
  description: 'Trajetória, formação e capacidades de Fernando Braga entre arquitetura, computação gráfica, modelagem e representação.',
  path: '/sobre',
})

export default function Sobre() {
  return (
    <main id="conteudo" className="about-page">
      <section className="about-hero site-grid grid-12">
        <span className="about-hero__index technical-label technical-label--blue section-index">02 · Sobre</span>
        <div className="about-hero__title">
          <h1>Arquitetura como encontro entre matéria e sistema.</h1>
        </div>
        <figure className="about-hero__portrait">
          <img src="/database/images/profile_photo1.jpeg" alt="Fernando Braga" />
          <figcaption className="technical-label">São Paulo · 2026</figcaption>
        </figure>
        <div className="about-hero__intro">
          <p>
            Sou Fernando Braga, estudante de Arquitetura e Urbanismo na Universidade de São Paulo. Minha trajetória começou na computação gráfica e segue atravessando projeto, modelagem, representação e visualização.
          </p>
        </div>
      </section>

      <section className="about-trajectory site-grid" aria-labelledby="trajectory-title">
        <header className="about-section-title grid-12">
          <span className="technical-label section-index">01 · Formação</span>
          <h2 id="trajectory-title">Trajetória</h2>
        </header>

        <div className="trajectory-list">
          {trajectory.map((item, index) => (
            <article className={`trajectory-entry grid-12 ${!item.image ? 'trajectory-entry--textual' : ''}`} key={item.year}>
              <div className="trajectory-entry__year">
                <span>{item.year}</span>
                <small className="technical-label">{String(index + 1).padStart(2, '0')} / 03</small>
              </div>
              {item.image && (
                <figure className="trajectory-entry__visual">
                  <img src={item.image} alt={item.title} style={{ objectFit: item.fit, width: item.logoWidth, height: 'auto' }} loading="lazy" decoding="async" />
                </figure>
              )}
              <div className="trajectory-entry__copy">
                <span className="technical-label technical-label--blue">{item.subtitle}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-capabilities" aria-labelledby="capabilities-title">
        <div className="site-grid">
          <header className="about-section-title grid-12">
            <span className="technical-label section-index">02 · Capacidades</span>
            <h2 id="capabilities-title">Ferramentas organizadas por prática, não por porcentagem.</h2>
          </header>

          <div className="capabilities-list">
            {capabilities.map((capability) => (
              <div className="capability-row" key={capability.index}>
                <span className="technical-label technical-label--blue">{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.tools}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-certificates site-grid" aria-labelledby="certificates-title">
        <header className="about-section-title grid-12">
          <span className="technical-label section-index">03 · Documentos</span>
          <h2 id="certificates-title">Certificados & currículo</h2>
        </header>

        <div className="certificate-list">
          {certificates.map((certificate) => (
            <a className="certificate-row" href={certificate.href} target="_blank" rel="noreferrer" key={certificate.index}>
              <span className="technical-label technical-label--blue">{certificate.index}</span>
              <h3>{certificate.name}</h3>
              <div className="technical-label">
                <span>{certificate.issuer}</span>
                <span>{certificate.date}</span>
              </div>
              <span className="certificate-row__action">Abrir ↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
