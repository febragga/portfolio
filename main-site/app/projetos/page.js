'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { projects, getCategories, getLocations, getYears, getStatus, formatLabel } from '@/lib/projects'
import '@/styles/projetos.css'

const FILTER_SECTIONS = [
  { key: 'category', label: 'Tipologia', getOptions: getCategories },
  { key: 'year', label: 'Ano', getOptions: getYears },
  { key: 'status', label: 'Status', getOptions: getStatus },
  { key: 'location', label: 'Local', getOptions: getLocations },
]

export default function Projetos() {
  const [filters, setFilters] = useState({
    category: null,
    location: null,
    year: null,
    status: null,
  })

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const particles = []
    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.25 + 0.05,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74, 127, 255, ${particle.opacity})`
        ctx.fill()
      })

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(74, 127, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (filters.category && project.category !== filters.category) return false
      if (filters.location && project.location !== filters.location) return false
      if (filters.year && project.year !== filters.year) return false
      if (filters.status && project.status !== filters.status) return false
      return true
    })
  }, [filters])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }))
  }

  const clearFilters = () => {
    setFilters({ category: null, location: null, year: null, status: null })
  }

  const activeFilters = FILTER_SECTIONS.flatMap(({ key, label }) => {
    const value = filters[key]
    if (!value) return []
    const display = key === 'year' ? String(value) : formatLabel(value)
    return [{ key, label, value, display }]
  })

  const hasActiveFilters = activeFilters.length > 0

  return (
    <main className="projetos-container">
      <canvas ref={canvasRef} className="projetos-canvas" />

      <div className="projetos-wrapper">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2 className="filters-title">Projetos</h2>
            <button
              type="button"
              className="filters-mobile-toggle"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              aria-expanded={mobileFiltersOpen}
            >
              {mobileFiltersOpen ? 'Ocultar filtros' : 'Filtrar'}
            </button>
          </div>

          <div className={`filters-panel ${mobileFiltersOpen ? 'open' : ''}`}>
            {FILTER_SECTIONS.map(({ key, label, getOptions }) => (
              <div key={key} className="filter-section">
                <span className="filter-section-label">{label}</span>
                <div className="filter-pills" role="group" aria-label={label}>
                  {getOptions().map(option => {
                    const isActive = filters[key] === option
                    const display = key === 'year' ? String(option) : formatLabel(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`filter-pill ${isActive ? 'active' : ''}`}
                        aria-pressed={isActive}
                        onClick={() => handleFilterChange(key, option)}
                      >
                        {display}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {hasActiveFilters && (
              <button type="button" className="clear-all-btn" onClick={clearFilters}>
                Limpar filtros
              </button>
            )}
          </div>
        </aside>

        <div className="projetos-content">
          <div className="projetos-header">
            <div className="projetos-count">
              <span className="count-number">{filteredProjects.length}</span>
              <span className="count-label">projeto{filteredProjects.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="projects-line" />
          </div>

          {hasActiveFilters && (
            <div className="active-filters-bar">
              {activeFilters.map(({ key, value, display }) => (
                <button
                  key={`${key}-${value}`}
                  type="button"
                  className="active-filter-chip"
                  onClick={() => handleFilterChange(key, value)}
                  aria-label={`Remover filtro ${display}`}
                >
                  {display}
                  <span className="chip-remove">×</span>
                </button>
              ))}
            </div>
          )}

          <div className="projetos-grid">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projetos/${project.slug}`}
                className="project-card"
                style={{ '--delay': index * 0.05 + 's' }}
              >
                <div className="project-image-wrapper">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="project-title-wrapper">
                      <h3>{project.title}</h3>
                      <div className="project-arrow">→</div>
                    </div>
                  </div>
                  <div className="project-border" />
                </div>
                <div className="project-meta">
                  <span className="project-category">{formatLabel(project.category)}</span>
                  <span className="project-year">{project.year}</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <div className="no-projects-visual">
                <div className="empty-square" />
                <div className="empty-square" />
                <div className="empty-square" />
              </div>
              <p>Nenhum projeto encontrado</p>
              {hasActiveFilters && (
                <button type="button" className="clear-all-btn inline" onClick={clearFilters}>
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
