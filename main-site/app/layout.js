import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear()

  return (
    <html lang="pt-br">
      <body>
        <header>
          <div className="header-left">
            <h1>
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                FERNANDO BRAGA PORTFÓLIO
              </Link>
            </h1>
          </div>
          <nav>
            <ul>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </nav>
        </header>

        {children}

        <footer>
          <div className="footer-wrapper">
            <div className="footer-simple">
              <div className="footer-left">
                <img
                  src="/assinatura.svg"
                  alt="Assinatura Fernando Braga"
                  className="signature-image"
                  loading="lazy"
                />
              </div>
              
              <div className="footer-center">
                <p>Uberlândia-MG ©2026</p>
              </div>
              
              <div className="footer-right">
                <a href="mailto:f_bragga@icloud.com">f_bragga@icloud.com</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@inf_bragga</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}