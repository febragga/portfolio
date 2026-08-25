export const site = {
  name: 'Fernando Braga — Arquitetura e Urbanismo',
  shortName: 'Fernando Braga',
  url: 'https://portfolio-febraggas-projects.vercel.app',
  locale: 'pt_BR',
  language: 'pt-BR',
  description: 'Portfólio de arquitetura, urbanismo, representação e visualização de Fernando Braga.',
  email: 'contato@fernandobragaportfolio.com.br',
  instagram: 'https://www.instagram.com/inf_bragga',
  linkedin: 'https://www.linkedin.com/in/fe-braga-arq',
}

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString()

export const titled = (title) => `${title} — Fernando Braga`

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: titled(title),
      description,
      url: path,
      siteName: site.shortName,
      locale: site.locale,
      type: 'website',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Fernando Braga — Arquitetura, urbanismo e visualização',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titled(title),
      description,
      images: ['/twitter-image'],
    },
  }
}

export const serializeJsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c')
