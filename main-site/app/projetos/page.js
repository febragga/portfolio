'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { projects, getCategories, getLocations, getYears, getStatus } from '@/lib/projects'
import '@/styles/projetos.css'

export default function Projetos() {
  const [filters, setFilters] = useState({
    category: null,
    location: null,
    year: null,
    status: null,
  })

  const [openFilters, setOpenFilters] = useState({
    category: false,
    location: false,
    year: false,
    status: false,
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
        opacity: Math.random() * 0.2 + 0.05,
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
        ctx.fillStyle = `rgba(0, 56, 186, ${particle.opacity})`
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
            ctx.strokeStyle = `rgba(0, 56, 186, ${0.08 * (1 - distance / 100)})`
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

  // Filtrar projetos baseado nos filtros selecionados
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

  const toggleFilter = (filterType) => {
    setOpenFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }))
  }

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  const clearFilters = () => {
    setFilters({ category: null, location: null, year: null, status: null })
  }

  const hasActiveFilters = filters.category || filters.location || filters.year || filters.status

  return (
    <main className="projetos-container">
      <canvas ref={canvasRef} className="projetos-canvas" />
      
      <div className="projetos-wrapper">
        {/* SIDEBAR DE FILTROS */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <div className="filter-title-visual">
              <div className={`filter-square ${mobileFiltersOpen ? 'rotated' : ''}`} />
              <button 
                className="filter-label"
                onClick={toggleMobileFilters}
              >
                Filtros
              </button>
            </div>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                <span className="clear-icon">×</span>
              </button>
            )}
          </div>

          {/* Filter Categories */}
          <div className={`filter-categories ${mobileFiltersOpen ? 'open' : ''}`}>

          {/* CATEGORIA */}
          <div className={`filter-group ${openFilters.category ? 'active' : ''}`}>
            <button 
              className="filter-title"
              onClick={() => toggleFilter('category')}
            >
              <div className="filter-indicator" />
              <span>Tipologia</span>
              <div className={`filter-toggle ${openFilters.category ? 'open' : ''}`}>
                <div className="toggle-line toggle-line-1" />
                <div className="toggle-line toggle-line-2" />
              </div>
            </button>
            <div className="filter-options">
              {getCategories().map(cat => (
                <label key={cat} className={`filter-option ${filters.category === cat ? 'active' : ''}`}>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.category === cat}
                      onChange={() => handleFilterChange('category', cat)}
                    />
                    <div className="checkbox-visual" />
                  </div>
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* LOCALIZAÇÃO */}
          <div className={`filter-group ${openFilters.location ? 'active' : ''}`}>
            <button 
              className="filter-title"
              onClick={() => toggleFilter('location')}
            >
              <div className="filter-indicator" />
              <span>Localização</span>
              <div className={`filter-toggle ${openFilters.location ? 'open' : ''}`}>
                <div className="toggle-line toggle-line-1" />
                <div className="toggle-line toggle-line-2" />
              </div>
            </button>
            <div className="filter-options">
              {getLocations().map(loc => (
                <label key={loc} className={`filter-option ${filters.location === loc ? 'active' : ''}`}>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.location === loc}
                      onChange={() => handleFilterChange('location', loc)}
                    />
                    <div className="checkbox-visual" />
                  </div>
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ANO */}
          <div className={`filter-group ${openFilters.year ? 'active' : ''}`}>
            <button 
              className="filter-title"
              onClick={() => toggleFilter('year')}
            >
              <div className="filter-indicator" />
              <span>Ano</span>
              <div className={`filter-toggle ${openFilters.year ? 'open' : ''}`}>
                <div className="toggle-line toggle-line-1" />
                <div className="toggle-line toggle-line-2" />
              </div>
            </button>
            <div className="filter-options">
              {getYears().map(year => (
                <label key={year} className={`filter-option ${filters.year === year ? 'active' : ''}`}>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.year === year}
                      onChange={() => handleFilterChange('year', year)}
                    />
                    <div className="checkbox-visual" />
                  </div>
                  <span>{year}</span>
                </label>
              ))}
            </div>
          </div>

          {/* STATUS */}
          <div className={`filter-group ${openFilters.status ? 'active' : ''}`}>
            <button 
              className="filter-title"
              onClick={() => toggleFilter('status')}
            >
              <div className="filter-indicator" />
              <span>Status</span>
              <div className={`filter-toggle ${openFilters.status ? 'open' : ''}`}>
                <div className="toggle-line toggle-line-1" />
                <div className="toggle-line toggle-line-2" />
              </div>
            </button>
            <div className="filter-options">
              {getStatus().map(st => (
                <label key={st} className={`filter-option ${filters.status === st ? 'active' : ''}`}>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.status === st}
                      onChange={() => handleFilterChange('status', st)}
                    />
                    <div className="checkbox-visual" />
                  </div>
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </div>
          </div>
        </aside>

        {/* GRID DE PROJETOS */}
        <div className="projetos-content">
          <div className="projetos-header">
            <div className="projetos-count">
              <span className="count-number">{filteredProjects.length}</span>
              <span className="count-label">projeto{filteredProjects.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="projects-line" />
          </div>

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
                  <span className="project-category">{project.category}</span>
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
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
