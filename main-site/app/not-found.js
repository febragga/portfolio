import Link from 'next/link'

export const metadata = {
  title: 'Página não encontrada',
  description: 'A página solicitada não existe no arquivo de Fernando Braga.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main id="conteudo" className="system-state site-grid grid-12">
      <span className="system-state__code" aria-hidden="true">404</span>
      <div className="system-state__content">
        <span className="technical-label technical-label--blue section-index">Fora do arquivo</span>
        <h1>Página não encontrada.</h1>
        <p>O endereço pode ter mudado ou o conteúdo não faz parte deste arquivo.</p>
        <div className="system-state__actions">
          <Link href="/" className="text-link">Voltar ao início</Link>
          <Link href="/projetos" className="text-link">Explorar projetos</Link>
        </div>
      </div>
    </main>
  )
}
