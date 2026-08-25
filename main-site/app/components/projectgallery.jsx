'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import '@/styles/gallery.css'

const mediaLabel = {
  image: 'Imagem',
  video: 'Vídeo',
  pdf: 'PDF',
}

const technicalMediaPattern = /(planta|corte|elevação|axonom|implantação|prancha|análise|mapa|desenho geral|detalhe construtivo|view 1:20)/i
const mediaHash = (index) => `galeria-${String(index + 1).padStart(2, '0')}`
const isTechnicalMedia = (item) => item?.type === 'image' && technicalMediaPattern.test(item.title || '')
const initialDrawingView = { scale: 1, x: 0, y: 0 }
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

function AtlasImage({ src, alt, className, quality, sizes, draggable, hidden = false, style, onError }) {
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      fill
      loading="lazy"
      quality={quality}
      sizes={sizes}
      draggable={draggable}
      aria-hidden={hidden || undefined}
      style={style}
      onError={onError}
    />
  )
}

export default function ProjectGallery({ gallery = [], projectNumber = '', initialIndex = 0 }) {
  const safeInitialIndex = Math.min(Math.max(initialIndex, 0), Math.max(gallery.length - 1, 0))
  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex)
  const [fullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const touchStart = useRef(null)
  const closeButtonRef = useRef(null)
  const lightboxRef = useRef(null)
  const stageRef = useRef(null)
  const currentIndexRef = useRef(safeInitialIndex)
  const copyTimerRef = useRef(null)
  const drawingHintTimerRef = useRef(null)
  const drawingViewportRef = useRef(null)
  const drawingViewRef = useRef(initialDrawingView)
  const drawingPointersRef = useRef(new Map())
  const drawingGestureRef = useRef({ pan: null, pinch: null })
  const [drawingView, setDrawingView] = useState(initialDrawingView)
  const [drawingHint, setDrawingHint] = useState(false)
  const [failedMedia, setFailedMedia] = useState(null)

  const currentItem = gallery[currentIndex]
  const technicalPresentation = isTechnicalMedia(currentItem)

  const constrainDrawingView = (view) => {
    const scale = clamp(view.scale, 1, 5)
    const bounds = drawingViewportRef.current?.getBoundingClientRect()
    if (!bounds || scale === 1) return { scale, x: 0, y: 0 }

    const maxX = bounds.width * (scale - 1) * 0.5
    const maxY = bounds.height * (scale - 1) * 0.5
    return {
      scale,
      x: clamp(view.x, -maxX, maxX),
      y: clamp(view.y, -maxY, maxY),
    }
  }

  const applyDrawingView = (view) => {
    const constrained = constrainDrawingView(view)
    drawingViewRef.current = constrained
    setDrawingView(constrained)
  }

  const resetDrawingView = () => applyDrawingView(initialDrawingView)

  const drawingPoint = (clientX, clientY) => {
    const bounds = drawingViewportRef.current?.getBoundingClientRect()
    if (!bounds) return { x: 0, y: 0 }
    return {
      x: clientX - bounds.left - bounds.width / 2,
      y: clientY - bounds.top - bounds.height / 2,
    }
  }

  const zoomDrawing = (requestedScale, clientX, clientY) => {
    const current = drawingViewRef.current
    const scale = clamp(requestedScale, 1, 5)
    const point = Number.isFinite(clientX) ? drawingPoint(clientX, clientY) : { x: 0, y: 0 }
    const ratio = scale / current.scale
    applyDrawingView({
      scale,
      x: point.x - (point.x - current.x) * ratio,
      y: point.y - (point.y - current.y) * ratio,
    })
  }

  const handleDrawingWheel = (event) => {
    event.preventDefault()
    const factor = Math.exp(-event.deltaY * 0.0015)
    zoomDrawing(drawingViewRef.current.scale * factor, event.clientX, event.clientY)
  }

  const handleDrawingPointerDown = (event) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture?.(event.pointerId)
    drawingPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    const points = [...drawingPointersRef.current.values()]
    if (points.length === 1) {
      drawingGestureRef.current = {
        pan: { pointerId: event.pointerId, x: event.clientX, y: event.clientY, view: drawingViewRef.current },
        pinch: null,
      }
      return
    }

    if (points.length === 2) {
      const [first, second] = points
      drawingGestureRef.current = {
        pan: null,
        pinch: {
          distance: Math.hypot(second.x - first.x, second.y - first.y) || 1,
          midpoint: drawingPoint((first.x + second.x) / 2, (first.y + second.y) / 2),
          view: drawingViewRef.current,
        },
      }
    }
  }

  const handleDrawingPointerMove = (event) => {
    if (!drawingPointersRef.current.has(event.pointerId)) return
    drawingPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const points = [...drawingPointersRef.current.values()]
    const gesture = drawingGestureRef.current

    if (points.length === 2 && gesture.pinch) {
      const [first, second] = points
      const distance = Math.hypot(second.x - first.x, second.y - first.y) || 1
      const midpoint = drawingPoint((first.x + second.x) / 2, (first.y + second.y) / 2)
      const scale = clamp(gesture.pinch.view.scale * (distance / gesture.pinch.distance), 1, 5)
      const ratio = scale / gesture.pinch.view.scale
      applyDrawingView({
        scale,
        x: gesture.pinch.midpoint.x - (gesture.pinch.midpoint.x - gesture.pinch.view.x) * ratio + midpoint.x - gesture.pinch.midpoint.x,
        y: gesture.pinch.midpoint.y - (gesture.pinch.midpoint.y - gesture.pinch.view.y) * ratio + midpoint.y - gesture.pinch.midpoint.y,
      })
      return
    }

    if (points.length === 1 && gesture.pan && drawingViewRef.current.scale > 1) {
      applyDrawingView({
        ...gesture.pan.view,
        x: gesture.pan.view.x + event.clientX - gesture.pan.x,
        y: gesture.pan.view.y + event.clientY - gesture.pan.y,
      })
    }
  }

  const handleDrawingPointerEnd = (event) => {
    drawingPointersRef.current.delete(event.pointerId)
    const remaining = [...drawingPointersRef.current.entries()]
    if (remaining.length === 1) {
      const [pointerId, point] = remaining[0]
      drawingGestureRef.current = {
        pan: { pointerId, x: point.x, y: point.y, view: drawingViewRef.current },
        pinch: null,
      }
    } else {
      drawingGestureRef.current = { pan: null, pinch: null }
    }
  }

  const selectMedia = (requestedIndex, updateUrl = true) => {
    if (!gallery.length) return
    const normalizedIndex = (requestedIndex + gallery.length) % gallery.length
    currentIndexRef.current = normalizedIndex
    setCurrentIndex(normalizedIndex)
    setCopied(false)
    setFailedMedia(null)

    if (updateUrl && typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.hash = mediaHash(normalizedIndex)
      window.history.replaceState(window.history.state, '', url)
    }
  }

  const previous = () => selectMedia(currentIndexRef.current - 1)
  const next = () => selectMedia(currentIndexRef.current + 1)

  useEffect(() => {
    const match = window.location.hash.match(/^#galeria-(\d{2})$/)
    if (!match) return
    const requestedIndex = Number(match[1]) - 1
    if (requestedIndex >= 0 && requestedIndex < gallery.length) {
      const frame = window.requestAnimationFrame(() => {
        currentIndexRef.current = requestedIndex
        setCurrentIndex(requestedIndex)
        setCopied(false)
        setFailedMedia(null)
      })
      return () => window.cancelAnimationFrame(frame)
    }
    return undefined
  }, [gallery.length])

  useEffect(() => () => {
    window.clearTimeout(copyTimerRef.current)
    window.clearTimeout(drawingHintTimerRef.current)
  }, [])

  useEffect(() => {
    if (!fullscreen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setFullscreen(false)
        return
      }

      if (event.key === 'Tab') {
        const focusable = [...(lightboxRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        ) || [])].filter((element) => !element.hasAttribute('aria-hidden'))
        const first = focusable[0]
        const last = focusable.at(-1)
        if (first && last && event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (first && last && !event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }

      if (technicalPresentation) {
        if (event.key === '+' || event.key === '=') {
          event.preventDefault()
          zoomDrawing(drawingViewRef.current.scale * 1.35)
          return
        }
        if (event.key === '-') {
          event.preventDefault()
          zoomDrawing(drawingViewRef.current.scale / 1.35)
          return
        }
        if (event.key === '0') {
          event.preventDefault()
          resetDrawingView()
          return
        }
        if (drawingViewRef.current.scale > 1 && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
          event.preventDefault()
          const distance = event.shiftKey ? 120 : 52
          const current = drawingViewRef.current
          applyDrawingView({
            ...current,
            x: current.x + (event.key === 'ArrowLeft' ? distance : event.key === 'ArrowRight' ? -distance : 0),
            y: current.y + (event.key === 'ArrowUp' ? distance : event.key === 'ArrowDown' ? -distance : 0),
          })
          return
        }
      }

      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }

    document.body.classList.add('media-locked')
    window.addEventListener('keydown', onKeyDown)

    const previousStage = stageRef.current
    const setupFrame = window.requestAnimationFrame(() => {
      resetDrawingView()
      drawingPointersRef.current.clear()
      drawingGestureRef.current = { pan: null, pinch: null }
      window.clearTimeout(drawingHintTimerRef.current)

      if (technicalPresentation) {
        setDrawingHint(true)
        drawingHintTimerRef.current = window.setTimeout(() => setDrawingHint(false), 2200)
        drawingViewportRef.current?.focus()
      } else {
        setDrawingHint(false)
        closeButtonRef.current?.focus()
      }
    })

    return () => {
      window.cancelAnimationFrame(setupFrame)
      document.body.classList.remove('media-locked')
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(drawingHintTimerRef.current)
      previousStage?.focus()
    }
  }, [fullscreen, gallery.length, currentIndex, technicalPresentation])

  useEffect(() => {
    const viewport = drawingViewportRef.current
    if (!fullscreen || !technicalPresentation || !viewport) return undefined

    const onWheel = (event) => handleDrawingWheel(event)
    viewport.addEventListener('wheel', onWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', onWheel)
  }, [fullscreen, currentIndex, technicalPresentation])

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previous()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
    if (event.key.toLowerCase() === 'f' && currentItem?.type === 'image') {
      event.preventDefault()
      setFullscreen(true)
    }
  }

  const handleTouchStart = (event) => {
    touchStart.current = event.changedTouches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 45) {
      if (distance > 0) previous()
      else next()
    }
    touchStart.current = null
  }

  const copyMediaLink = async () => {
    const url = new URL(window.location.href)
    url.hash = mediaHash(currentIndexRef.current)
    window.history.replaceState(window.history.state, '', url)

    try {
      await navigator.clipboard.writeText(url.toString())
      setCopied(true)
      window.clearTimeout(copyTimerRef.current)
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const playCurrentVideo = () => {
    const video = stageRef.current?.querySelector('video')
    video?.play()
    video?.focus()
  }

  const renderMedia = (item, isFullscreen = false, drawingStyle) => {
    if (!item) return null

    if (item.type === 'video') {
      if (failedMedia === item.src) {
        return (
          <div className="atlas-media__fallback">
            <span className="technical-label technical-label--blue">Vídeo indisponível</span>
            <strong>{item.title}</strong>
            <a href={item.src} className="text-link">Abrir arquivo</a>
          </div>
        )
      }
      return (
        <video
          className="atlas-media__video"
          controls
          playsInline
          preload="metadata"
          poster={item.thumbnail}
          key={item.src}
          onError={() => setFailedMedia(item.src)}
        >
          <source src={item.src} type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      )
    }

    if (item.type === 'pdf') {
      return (
        <div className={`atlas-pdf ${isFullscreen ? 'atlas-pdf--fullscreen' : ''} ${failedMedia === item.src ? 'is-failed' : ''}`}>
          <iframe src={`${item.src}#toolbar=0&navpanes=0`} title={item.title} loading="lazy" onError={() => setFailedMedia(item.src)} />
          <div className="atlas-pdf__fallback">
            <span className="technical-label technical-label--blue">PDF</span>
            <strong>{item.title}</strong>
            <a href={item.src} target="_blank" rel="noopener noreferrer" className="text-link">Abrir PDF</a>
          </div>
        </div>
      )
    }

    const previewSrc = item.thumbnail || item.poster

    if (failedMedia === item.src) {
      return (
        <div className="atlas-media__fallback">
          <span className="technical-label technical-label--blue">Imagem indisponível</span>
          <strong>{item.title || 'Imagem do projeto'}</strong>
        </div>
      )
    }

    return (
      <>
        {previewSrc && (
          <AtlasImage
            className="atlas-media__placeholder"
            src={previewSrc}
            alt=""
            quality={66}
            sizes="220px"
            hidden
          />
        )}
        <AtlasImage
          className="atlas-media__image"
          src={item.src}
          alt={item.title || 'Imagem do projeto'}
          quality={isFullscreen ? 94 : 90}
          sizes="100vw"
          draggable={false}
          style={drawingStyle}
          onError={() => setFailedMedia(item.src)}
        />
      </>
    )
  }

  if (!gallery.length) {
    return (
      <section className="atlas-gallery atlas-gallery--empty" aria-labelledby="gallery-title" data-atlas-section="03" data-atlas-label="Arquivo visual">
        <header className="atlas-gallery__heading">
          <span className="technical-label section-index">03 · Material</span>
          <h2 id="gallery-title">Arquivo visual</h2>
        </header>
        <p>Este projeto não possui material adicional publicado.</p>
      </section>
    )
  }

  const drawingImageStyle = technicalPresentation ? {
    transform: `translate3d(${drawingView.x}px, ${drawingView.y}px, 0) scale(${drawingView.scale})`,
  } : undefined
  const currentMediaLabel = technicalPresentation ? 'Desenho' : (mediaLabel[currentItem.type] || currentItem.type)

  return (
    <section className="atlas-gallery" aria-labelledby="gallery-title" data-atlas-section="03" data-atlas-label="Arquivo visual">
      <header className="atlas-gallery__heading">
        <div>
          <span className="technical-label section-index">03 · Material</span>
          <h2 id="gallery-title">Arquivo visual</h2>
        </div>
        <p className="technical-label">{String(gallery.length).padStart(2, '0')} itens · Use ← →</p>
      </header>

      <div
        ref={stageRef}
        id={mediaHash(currentIndex)}
        className="atlas-gallery__stage"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label={`Visualizador: ${currentItem.title}`}
      >
        <div
          key={currentItem.id || currentItem.src}
          className={`atlas-media atlas-media--${currentItem.type} ${technicalPresentation ? 'atlas-media--technical' : ''}`}
        >
          {renderMedia(currentItem)}
        </div>

        {currentItem.type === 'image' && (
          <button type="button" className="atlas-gallery__action" onClick={() => setFullscreen(true)}>
            {technicalPresentation ? 'Inspecionar' : 'Expandir'} <span aria-hidden="true">↗</span>
          </button>
        )}
        {currentItem.type === 'pdf' && (
          <a className="atlas-gallery__action" href={currentItem.src} target="_blank" rel="noopener noreferrer">
            Abrir PDF <span aria-hidden="true">↗</span>
          </a>
        )}
        {currentItem.type === 'video' && (
          <button type="button" className="atlas-gallery__action" onClick={playCurrentVideo}>Reproduzir</button>
        )}
      </div>

      <div className="atlas-gallery__controlbar">
        <div className="atlas-gallery__caption">
          <span className="atlas-gallery__caption-number" aria-hidden="true">{String(currentIndex + 1).padStart(2, '0')}</span>
          <div>
            <span className="technical-label technical-label--blue">
              {projectNumber ? `${projectNumber} / ` : ''}{currentMediaLabel}
            </span>
            <h3>{currentItem.title}</h3>
          </div>
        </div>
        <div className="atlas-gallery__utilities">
          <button type="button" className="atlas-gallery__copy" onClick={copyMediaLink} aria-live="polite" data-copied={copied ? 'true' : undefined}>
            {copied ? 'Copiado ✓' : 'Copiar link'}
          </button>
          <div className="atlas-gallery__navigation">
            <span className="atlas-gallery__counter technical-label">
              {String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={previous} aria-label="Item anterior">←</button>
            <button type="button" onClick={next} aria-label="Próximo item">→</button>
          </div>
        </div>
      </div>

      <div className="atlas-gallery__index" aria-label="Índice da galeria">
        {gallery.map((item, index) => {
          const previewSrc = item.thumbnail || item.poster
          return (
            <button
            type="button"
            key={item.id || `${item.src}-${index}`}
            className="atlas-thumbnail"
            aria-current={index === currentIndex ? 'true' : undefined}
            aria-label={`Ver ${item.title}`}
            onClick={() => selectMedia(index)}
          >
            <span className="atlas-thumbnail__preview">
              {previewSrc && item.type === 'image' ? (
                <AtlasImage src={previewSrc} alt="" quality={66} sizes="100px" hidden />
              ) : (
                <span className="atlas-thumbnail__file technical-label">{item.type === 'pdf' ? 'PDF' : 'VID'}</span>
              )}
            </span>
            <span className="atlas-thumbnail__number technical-label">{String(index + 1).padStart(2, '0')}</span>
          </button>
          )
        })}
      </div>

      {fullscreen && currentItem.type === 'image' && (
        <div ref={lightboxRef} className="atlas-lightbox" role="dialog" aria-modal="true" aria-label={currentItem.title}>
          <header className="atlas-lightbox__header">
            <div>
              <span className="technical-label technical-label--blue">{projectNumber} / {currentMediaLabel}</span>
              <span className="technical-label">{currentItem.title}</span>
            </div>
            <button ref={closeButtonRef} type="button" onClick={() => setFullscreen(false)} aria-label="Fechar visualização">Fechar ×</button>
          </header>
          <div
            ref={drawingViewportRef}
            key={currentItem.id || currentItem.src}
            className={`atlas-lightbox__media ${technicalPresentation ? 'atlas-lightbox__media--technical' : ''}`}
            tabIndex={technicalPresentation ? 0 : undefined}
            aria-label={technicalPresentation ? 'Desenho técnico ampliável. Use scroll, gesto de pinça ou as teclas mais e menos para ampliar; zero para redefinir.' : undefined}
            onDoubleClick={technicalPresentation ? (event) => zoomDrawing(drawingViewRef.current.scale > 1 ? 1 : 2.25, event.clientX, event.clientY) : undefined}
            onPointerDown={technicalPresentation ? handleDrawingPointerDown : undefined}
            onPointerMove={technicalPresentation ? handleDrawingPointerMove : undefined}
            onPointerUp={technicalPresentation ? handleDrawingPointerEnd : undefined}
            onPointerCancel={technicalPresentation ? handleDrawingPointerEnd : undefined}
            onLostPointerCapture={technicalPresentation ? handleDrawingPointerEnd : undefined}
            onTouchStart={technicalPresentation ? undefined : handleTouchStart}
            onTouchEnd={technicalPresentation ? undefined : handleTouchEnd}
          >
            {renderMedia(currentItem, true, drawingImageStyle)}
            {technicalPresentation && (
              <span className={`atlas-drawing-hint ${drawingHint ? 'is-visible' : ''}`} aria-hidden="true">
                Scroll / pinch to zoom
              </span>
            )}
          </div>
          <footer className="atlas-lightbox__footer">
            {technicalPresentation ? (
              <button type="button" className="atlas-drawing-reset" onClick={resetDrawingView} disabled={drawingView.scale === 1}>
                {String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')} · {Math.round(drawingView.scale * 100)}% — Reset
              </button>
            ) : (
              <span className="technical-label">{String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
            )}
            <div>
              <button type="button" onClick={previous} aria-label="Item anterior">←</button>
              <button type="button" onClick={next} aria-label="Próximo item">→</button>
            </div>
          </footer>
        </div>
      )}
    </section>
  )
}
