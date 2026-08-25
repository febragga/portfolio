'use client'

export default function GlobalError({ reset }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: '#080d16', color: '#edf2fb', fontFamily: 'Arial, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px', padding: 'clamp(24px, 6vw, 80px)' }}>
          <span style={{ color: '#5b88ff', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Erro de aplicação</span>
          <h1 style={{ margin: 0, maxWidth: '900px', fontSize: 'clamp(44px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.055em' }}>O arquivo encontrou uma interrupção.</h1>
          <p style={{ margin: 0, color: '#a0aec4', fontSize: '18px' }}>Recarregue a experiência para tentar novamente.</p>
          <button type="button" onClick={reset} style={{ alignSelf: 'flex-start', padding: '12px 18px', border: '1px solid #5b88ff', background: 'transparent', color: '#edf2fb', cursor: 'pointer' }}>Tentar novamente</button>
        </main>
      </body>
    </html>
  )
}
