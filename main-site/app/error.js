'use client'

import Link from 'next/link'

export default function ErrorPage({ reset }) {
  return (
    <main id="conteudo" className="system-state site-grid grid-12">
      <span className="system-state__code" aria-hidden="true">ERR</span>
      <div className="system-state__content">
        <span className="technical-label technical-label--blue section-index">Interrupção inesperada</span>
        <h1>Não foi possível abrir esta página.</h1>
        <p>Tente novamente. Se o problema persistir, retorne ao arquivo de projetos.</p>
        <div className="system-state__actions">
          <button type="button" className="text-link" onClick={reset}>Tentar novamente</button>
          <Link href="/projetos" className="text-link">Explorar projetos</Link>
        </div>
      </div>
    </main>
  )
}
