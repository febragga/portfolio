import '@/styles/globals.css'
import SiteHeader from '@/components/site-header'
import { serializeJsonLd, site } from '@/lib/site'

export const metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.shortName,
  title: {
    default: site.name,
    template: '%s — Fernando Braga',
  },
  description: site.description,
  keywords: ['arquitetura', 'urbanismo', 'representação arquitetônica', 'visualização 3D', 'Fernando Braga'],
  authors: [{ name: 'Fernando Braga', url: site.url }],
  creator: 'Fernando Braga',
  publisher: 'Fernando Braga',
  category: 'architecture',
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: '/',
    siteName: site.shortName,
    locale: site.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#080d16',
  colorScheme: 'dark',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: site.language,
    },
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: 'Fernando Braga',
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: 'Estudante de Arquitetura e Urbanismo',
      sameAs: [site.instagram, site.linkedin],
      knowsAbout: ['Arquitetura', 'Urbanismo', 'Computação gráfica', 'Modelagem 3D', 'Representação arquitetônica'],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="site-grid grid-12 site-footer__grid">
            <div className="site-footer__brand">
              <img
                src="/assinatura.svg"
                alt="Fernando Braga"
                className="site-footer__signature"
                loading="lazy"
              />
              <span className="technical-label">Arquitetura · Urbanismo · Visualização</span>
            </div>

            <div className="site-footer__meta technical-label">
              <span>Uberlândia — MG</span>
              <span>São Paulo — SP</span>
              <span>© {new Date().getFullYear()}</span>
            </div>

            <div className="site-footer__links">
              <a className="site-footer__link" href="mailto:contato@fernandobragaportfolio.com.br">E-mail</a>
              <a className="site-footer__link" href="https://www.instagram.com/inf_bragga" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
