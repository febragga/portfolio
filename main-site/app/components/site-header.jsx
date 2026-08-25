'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { href: '/projetos', label: 'Projetos', number: '01' },
  { href: '/sobre', label: 'Sobre', number: '02' },
  { href: '/contato', label: 'Contato', number: '03' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [atlasIndex, setAtlasIndex] = useState(null)

  useEffect(() => {
    const handleAtlasSection = (event) => setAtlasIndex(event.detail)
    window.addEventListener('atlas-section-change', handleAtlasSection)

    const frame = window.requestAnimationFrame(() => {
      const caseStudy = document.querySelector('[data-atlas-project]')
      setAtlasIndex(caseStudy
        ? { project: caseStudy.dataset.atlasProject, section: '01', label: 'Abertura' }
        : null)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('atlas-section-change', handleAtlasSection)
    }
  }, [pathname])

  return (
    <header className="site-header">
      <div className="site-grid site-header__inner">
        <Link href="/" className="site-brand" aria-label="Fernando Braga — página inicial">
          <span className="site-brand__mark" aria-hidden="true" />
          <span className="site-brand__name">Fernando Braga</span>
        </Link>

        {atlasIndex && (
          <div className="site-header__atlas technical-label" aria-hidden="true">
            <span>{atlasIndex.project} / {atlasIndex.section}</span>
            <span>{atlasIndex.label}</span>
          </div>
        )}

        <nav className="site-nav" aria-label="Navegação principal">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="site-nav__link"
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="site-nav__number" aria-hidden="true">{item.number}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
