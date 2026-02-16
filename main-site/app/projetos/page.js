'use client'

import { useState, useMemo } from 'react'
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
    category: true,
    location: false,
    year: false,
    status: false,
  })

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

  const clearFilters = () => {
    setFilters({ category: null, location: null, year: null, status: null })
  }

  return (
    <main className="projetos-container">
      <div className="projetos-wrapper">
        {/* SIDEBAR DE FILTROS */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filtros</h3>
            {(filters.category || filters.location || filters.year || filters.status) && (
              <button className="clear-filters" onClick={clearFilters}>
                Limpar
              </button>
            )}
          </div>

          {/* CATEGORIA */}
          <div className="filter-group">
            <button 
              className="filter-title"
              onClick={() => toggleFilter('category')}
            >
              <span>Tipologia</span>
              <span className={`toggle-icon ${openFilters.category ? 'open' : ''}`}>▼</span>
            </button>
            {openFilters.category && (
              <div className="filter-options">
                {getCategories().map(cat => (
                  <label key={cat} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.category === cat}
                      onChange={() => handleFilterChange('category', cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* LOCALIZAÇÃO */}
          <div className="filter-group">
            <button 
              className="filter-title"
              onClick={() => toggleFilter('location')}
            >
              <span>Localização</span>
              <span className={`toggle-icon ${openFilters.location ? 'open' : ''}`}>▼</span>
            </button>
            {openFilters.location && (
              <div className="filter-options">
                {getLocations().map(loc => (
                  <label key={loc} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.location === loc}
                      onChange={() => handleFilterChange('location', loc)}
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ANO */}
          <div className="filter-group">
            <button 
              className="filter-title"
              onClick={() => toggleFilter('year')}
            >
              <span>Ano</span>
              <span className={`toggle-icon ${openFilters.year ? 'open' : ''}`}>▼</span>
            </button>
            {openFilters.year && (
              <div className="filter-options">
                {getYears().map(year => (
                  <label key={year} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.year === year}
                      onChange={() => handleFilterChange('year', year)}
                    />
                    <span>{year}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* STATUS */}
          <div className="filter-group">
            <button 
              className="filter-title"
              onClick={() => toggleFilter('status')}
            >
              <span>Status</span>
              <span className={`toggle-icon ${openFilters.status ? 'open' : ''}`}>▼</span>
            </button>
            {openFilters.status && (
              <div className="filter-options">
                {getStatus().map(st => (
                  <label key={st} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.status === st}
                      onChange={() => handleFilterChange('status', st)}
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* GRID DE PROJETOS */}
        <div className="projetos-content">
          <div className="projetos-count">
            {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''}
          </div>

          <div className="projetos-grid">
            {filteredProjects.map(project => (
              <Link
                key={project.id}
                href={`/projetos/${project.slug}`}
                className="project-card"
              >
                <div className="project-image-wrapper">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <h3>{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>Nenhum projeto encontrado com esses filtros.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}