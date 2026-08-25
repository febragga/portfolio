'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import {
  projects,
  getCategories,
  getProjectTypes,
  getLocations,
  getYears,
  getStatus,
  formatLabel,
} from '@/lib/projects'
import '@/styles/projetos.css'

const FILTER_SECTIONS = [
  { key: 'projectType', label: 'Natureza', getOptions: getProjectTypes },
  { key: 'category', label: 'Tipologia', getOptions: getCategories },
  { key: 'year', label: 'Ano', getOptions: getYears },
  { key: 'status', label: 'Status', getOptions: getStatus },
  { key: 'location', label: 'Local', getOptions: getLocations },
]

const emptyFilters = {
  projectType: null,
  category: null,
  location: null,
  year: null,
  status: null,
}

const normalizeText = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

const getCardFormat = (project, index) => {
  if (project.category === 'desenhos' || project.category === 'paisagismo') return 'drawing'
  if ([0, 5, 9].includes(index)) return 'wide'
  if ([2, 7].includes(index)) return 'tall'
  return 'standard'
}

export default function Projetos() {
  const [filters, setFilters] = useState(emptyFilters)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [view, setView] = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const activeArchiveTransition = useRef(null)
  const filterTriggerRef = useRef(null)
  const filterCloseRef = useRef(null)

  useEffect(() => {
    if (!filtersOpen) return undefined
    const filterTrigger = filterTriggerRef.current
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setFiltersOpen(false)
    }
    document.body.classList.add('filters-locked')
    window.addEventListener('keydown', closeOnEscape)
    const focusFrame = window.requestAnimationFrame(() => filterCloseRef.current?.focus())
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.classList.remove('filters-locked')
      window.removeEventListener('keydown', closeOnEscape)
      filterTrigger?.focus()
    }
  }, [filtersOpen])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim())
    const result = projects.filter((project) => {
      if (filters.projectType && project.projectType !== filters.projectType) return false
      if (filters.category && project.category !== filters.category) return false
      if (filters.location && project.location !== filters.location) return false
      if (filters.year && project.year !== filters.year) return false
      if (filters.status && project.status !== filters.status) return false
      if (normalizedQuery) {
        const haystack = normalizeText([
          project.title,
          project.category,
          project.projectType,
          project.location,
          project.year,
        ].join(' '))
        if (!haystack.includes(normalizedQuery)) return false
      }
      return true
    })

    if (sort === 'newest') {
      return [...result].sort((a, b) => Number(b.year) - Number(a.year))
    }
    if (sort === 'oldest') {
      return [...result].sort((a, b) => Number(a.year) - Number(b.year))
    }
    if (sort === 'az') {
      return [...result].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
    }
    return result
  }, [filters, query, sort])

  const activeFilters = FILTER_SECTIONS.flatMap(({ key }) => {
    const value = filters[key]
    return value ? [{ key, value }] : []
  })
  const hasActiveFilters = activeFilters.length > 0 || query.trim().length > 0

  const reorganizeArchive = (update) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const quietTouchLayout = window.matchMedia('(hover: none), (max-width: 820px)').matches

    if (!document.startViewTransition || reducedMotion || quietTouchLayout) {
      update()
      return
    }

    activeArchiveTransition.current?.skipTransition()
    document.documentElement.classList.add('archive-reorganizing')
    const transition = document.startViewTransition(() => {
      flushSync(update)
    })
    activeArchiveTransition.current = transition
    transition.finished.finally(() => {
      if (activeArchiveTransition.current === transition) {
        document.documentElement.classList.remove('archive-reorganizing')
        activeArchiveTransition.current = null
      }
    })
  }

  const handleFilterChange = (key, value) => {
    reorganizeArchive(() => {
      setFilters((current) => ({ ...current, [key]: current[key] === value ? null : value }))
    })
  }

  const clearFilters = () => {
    reorganizeArchive(() => {
      setFilters(emptyFilters)
      setQuery('')
    })
  }

  return (
    <main id="conteudo" className="archive-page">
      <header className="archive-hero site-grid grid-12">
        <div className="archive-hero__index">
          <span className="technical-label technical-label--blue section-index">01 · Arquivo</span>
        </div>
        <div className="archive-hero__title">
          <h1>Projetos</h1>
          <p>Um índice de arquitetura, desenho, objetos, paisagem e investigação visual.</p>
        </div>
        <div className="archive-hero__count" aria-label={`${projects.length} projetos no arquivo`}>
          <span>{String(projects.length).padStart(2, '0')}</span>
          <small className="technical-label">Entradas<br />2024—26</small>
        </div>
      </header>

      <div className="archive-shell site-grid">
        <aside
          id="archive-filters"
          className={`archive-filters ${filtersOpen ? 'is-open' : ''}`}
          aria-label="Filtros de projetos"
          role={filtersOpen ? 'dialog' : undefined}
          aria-modal={filtersOpen ? 'true' : undefined}
        >
          <div className="archive-filters__mobile-head">
            <span className="technical-label">Filtros</span>
            <button ref={filterCloseRef} type="button" className="archive-icon-button" onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros">×</button>
          </div>

          <div className="archive-filters__body">
            {FILTER_SECTIONS.map(({ key, label, getOptions }) => (
              <section className="archive-filter" key={key}>
                <h2 className="technical-label">{label}</h2>
                <div className="archive-filter__options">
                  {getOptions().map((option) => {
                    const active = filters[key] === option
                    return (
                      <button
                        type="button"
                        key={String(option)}
                        className="archive-filter__option"
                        aria-pressed={active}
                        onClick={() => handleFilterChange(key, option)}
                      >
                        <span>{key === 'year' ? option : formatLabel(option)}</span>
                        <span aria-hidden="true">{active ? '×' : '+'}</span>
                      </button>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {hasActiveFilters && (
            <button type="button" className="archive-clear" onClick={clearFilters}>Limpar seleção</button>
          )}
        </aside>

        {filtersOpen && <button className="archive-backdrop" type="button" aria-label="Fechar filtros" onClick={() => setFiltersOpen(false)} />}

        <div className="archive-content">
          <div className="archive-toolbar">
            <label className="archive-search">
              <span className="technical-label">Buscar</span>
              <span className="archive-search__field">
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Nome, tipo ou local"
                />
                <span aria-hidden="true">⌕</span>
              </span>
            </label>

            <label className="archive-sort">
              <span className="technical-label">Ordenar</span>
              <select value={sort} onChange={(event) => reorganizeArchive(() => setSort(event.target.value))}>
                <option value="featured">Curadoria</option>
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
                <option value="az">A—Z</option>
              </select>
            </label>

            <div className="archive-view" role="group" aria-label="Modo de visualização">
              <button type="button" aria-pressed={view === 'grid'} onClick={() => reorganizeArchive(() => setView('grid'))}>Grid</button>
              <button type="button" aria-pressed={view === 'list'} onClick={() => reorganizeArchive(() => setView('list'))}>Lista</button>
            </div>

            <button
              ref={filterTriggerRef}
              type="button"
              className="archive-filter-trigger"
              aria-controls="archive-filters"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen(true)}
            >
              Filtros{activeFilters.length > 0 ? ` · ${activeFilters.length}` : ''}
            </button>
          </div>

          <div className="archive-results-head">
            <p className="technical-label" aria-live="polite">
              {String(filteredProjects.length).padStart(2, '0')} resultado{filteredProjects.length === 1 ? '' : 's'}
            </p>
            <div className="section-rule" />
          </div>

          {activeFilters.length > 0 && (
            <div className="archive-active-filters" aria-label="Filtros ativos">
              {activeFilters.map(({ key, value }) => (
                <button type="button" key={`${key}-${value}`} onClick={() => handleFilterChange(key, value)}>
                  {key === 'year' ? value : formatLabel(value)} <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          )}

          <div className={`archive-projects archive-projects--${view}`}>
            {filteredProjects.map((project, index) => (
              <Link
                href={`/projetos/${project.slug}`}
                className={`archive-card archive-card--${getCardFormat(project, index)}`}
                key={project.slug}
                style={{ viewTransitionName: `archive-${project.slug}` }}
              >
                <div className="archive-card__media">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    loading="lazy"
                    quality={76}
                    sizes={view === 'list'
                      ? '(max-width: 820px) 1px, 18vw'
                      : '(max-width: 820px) 100vw, 42vw'}
                  />
                </div>
                <div className="archive-card__info">
                  <span className="archive-card__number technical-label">{String(project.id).padStart(2, '0')}</span>
                  <h2>{project.title}</h2>
                  <div className="archive-card__meta technical-label">
                    <span>{formatLabel(project.projectType)}</span>
                    <span>{formatLabel(project.category)}</span>
                  </div>
                  <span className="archive-card__year technical-label">{project.year}</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="archive-empty">
              <span className="archive-empty__mark" aria-hidden="true" />
              <h2>Nenhum projeto corresponde à seleção.</h2>
              <button type="button" className="text-link" onClick={clearFilters}>Limpar filtros</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
