import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <header>
          <h1><Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Fernando Braga</Link></h1>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/projetos">Projetos</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </nav>
        </header>

        {children}

        <footer>
          <p>© 2026 Fernando Braga. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  )
}