'use client'

import { useState } from 'react'
import '@/styles/gallery.css'

export default function ProjectGallery({ gallery }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!gallery || gallery.length === 0) {
    return (
      <div className="projeto-gallery">
        <div className="gallery-header">
          <div className="gallery-accent"></div>
          <h2 className="gallery-title">Galeria</h2>
        </div>
        <div className="gallery-empty">
          <div className="empty-icon">📁</div>
          <p className="empty-text">Nenhum arquivo disponível neste projeto</p>
        </div>
      </div>
    )
  }

  const currentItem = gallery[currentIndex]
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < gallery.length - 1

  const goToPrevious = () => {
    if (canGoPrev) setCurrentIndex(currentIndex - 1)
  }

  const goToNext = () => {
    if (canGoNext) setCurrentIndex(currentIndex + 1)
  }

  const goToItem = (index) => {
    setCurrentIndex(index)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return '▶️'
      case 'pdf':
        return '📄'
      case 'image':
      default:
        return '🖼️'
    }
  }

  const renderContent = () => {
    const { type, src, poster, title } = currentItem

    switch (type) {
      case 'image':
        return (
          <img
            src={src}
            alt={title}
            className="viewer-image"
          />
        )
      
      case 'video':
        return (
          <video
            className="viewer-video"
            controls
            poster={poster}
            key={src}
          >
            <source src={src} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
        )
      
      case 'pdf':
        return (
          <div className="pdf-placeholder">
            <div className="pdf-icon">📄</div>
            <div className="pdf-info">
              <p><strong>{title}</strong></p>
              <p>Arquivo PDF</p>
              <a 
                href={src} 
                target="_blank" 
                rel="noopener noreferrer"
                className="pdf-link"
              >
                ⬇️ Baixar PDF
              </a>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="projeto-gallery">
      {/* Header */}
      <div className="gallery-header">
        <div className="gallery-accent"></div>
        <h2 className="gallery-title">Galeria</h2>
      </div>

      {/* Gallery Container */}
      <div className="gallery-container">
        {/* Viewer Principal */}
        <div className="gallery-viewer">
          <div className="viewer-content">
            {renderContent()}
          </div>
        </div>

        {/* Controles */}
        <div className="gallery-controls">
          <div className="gallery-info">
            <p className="info-title">{currentItem.title}</p>
            <p className="info-type">
              <span className="type-badge">{currentItem.type}</span>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="gallery-counter">
              {currentIndex + 1} / {gallery.length}
            </span>
            <div className="gallery-navigation">
              <button
                className="nav-button"
                onClick={goToPrevious}
                disabled={!canGoPrev}
                aria-label="Anterior"
                title="Anterior"
              >
                ←
              </button>
              <button
                className="nav-button"
                onClick={goToNext}
                disabled={!canGoNext}
                aria-label="Próximo"
                title="Próximo"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="gallery-thumbnails">
          {gallery.map((item, index) => (
            <button
              key={item.id}
              className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToItem(index)}
              aria-label={`Ir para ${item.title}`}
              title={item.title}
            >
              {/* Tipo de mídia - imagem ou ícone */}
              {item.type === 'image' && item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="thumbnail-image"
                />
              ) : (
                <div className="thumbnail-overlay">
                  <span className="thumbnail-icon">
                    {getTypeIcon(item.type)}
                  </span>
                </div>
              )}

              {/* Badge do tipo */}
              <span className="thumbnail-type">
                {item.type === 'pdf' ? 'PDF' : item.type === 'video' ? 'VÍD' : 'IMG'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}