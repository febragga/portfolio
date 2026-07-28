import '@/styles/globals.css'
import '@/styles/projetos.css'
import '@/styles/projeto-detalhes.css'
import Link from 'next/link'

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear()

  return (
    <html lang="pt-br">
      <body>
        <header className="minimal-header">
          <Link href="/" className="header-logo">
            <div className="logo-square" />
          </Link>
          <nav className="minimal-nav" aria-label="Navegação">
            <Link href="/projetos" className="nav-dot" title="Projetos" />
            <Link href="/sobre" className="nav-dot" title="Sobre" />
            <Link href="/contato" className="nav-dot" title="Contato" />
          </nav>
        </header>

        {children}

        <footer className="minimal-footer">
          <div className="footer-line" />
          <div className="footer-content">
            <div className="footer-signature">
              <img
                src="/assinatura.svg"
                alt="Assinatura Fernando Braga"
                className="footer-signature-img"
                loading="lazy"
              />
            </div>
            <div className="footer-info">
              <span>Uberlândia-MG</span>
              <span>•</span>
              <span>São Paulo-SP</span>
              <span>•</span>
              <span>©2026</span>
            </div>
            <div className="footer-links">
              <a href="mailto:contato@fernandobragaportfolio.com.br" className="footer-link">Email</a>
              <span>•</span>
              <a href="https://www.instagram.com/inf.bragga" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}