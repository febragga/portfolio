import '@/styles/contato.css'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Contato',
  description: 'Contato profissional de Fernando Braga para projetos, oportunidades e colaborações em arquitetura e representação.',
  path: '/contato',
})

const contactLinks = [
  { index: '01', label: 'E-mail', value: 'contato@fernandobragaportfolio.com.br', href: 'mailto:contato@fernandobragaportfolio.com.br' },
  { index: '02', label: 'Telefone', value: '(11) 91774-4243', href: 'tel:+5511917744243' },
  { index: '03', label: 'Instagram', value: '@inf_bragga', href: 'https://www.instagram.com/inf_bragga' },
  { index: '04', label: 'LinkedIn', value: '/in/fe-braga-arq', href: 'https://www.linkedin.com/in/fe-braga-arq' },
]

export default function Contato() {
  return (
    <main id="conteudo" className="contact-page">
      <section className="contact-hero site-grid grid-12">
        <span className="contact-hero__index technical-label technical-label--blue section-index">03 · Contato</span>
        <div className="contact-hero__title">
          <h1>Vamos conversar.</h1>
        </div>
        <div className="contact-hero__intro">
          <p>Projetos, oportunidades, colaborações ou uma conversa sobre arquitetura e representação.</p>
        </div>
        <a className="contact-hero__email" href="mailto:contato@fernandobragaportfolio.com.br">
          <span>contato@fernandobragaportfolio.com.br</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="contact-index site-grid" aria-labelledby="contact-index-title">
        <header className="contact-section-title grid-12">
          <span className="technical-label section-index">01 · Canais</span>
          <h2 id="contact-index-title">Contato direto</h2>
        </header>

        <div className="contact-list">
          {contactLinks.map((item) => (
            <a
              className="contact-row"
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              key={item.index}
            >
              <span className="technical-label technical-label--blue">{item.index}</span>
              <span className="technical-label">{item.label}</span>
              <strong>{item.value}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-location site-grid grid-12">
        <span className="technical-label section-index">02 · Localização</span>
        <div className="contact-location__places">
          <span>Uberlândia — MG</span>
          <span>São Paulo — SP</span>
        </div>
        <span className="contact-location__coordinate technical-label">18°55′S / 48°16′W<br />23°33′S / 46°38′W</span>
      </section>
    </main>
  )
}
