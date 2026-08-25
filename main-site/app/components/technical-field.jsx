'use client'

import { useEffect, useRef } from 'react'

export default function TechnicalField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = canvas.getContext('2d')
    const particles = []
    let frame

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    for (let index = 0; index < 22; index += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.2 + 0.4,
      })
    }

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(91, 136, 255, .38)'
        context.fill()

        particles.slice(index + 1).forEach((next) => {
          const distance = Math.hypot(particle.x - next.x, particle.y - next.y)
          if (distance < 150) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(next.x, next.y)
            context.strokeStyle = `rgba(45, 108, 255, ${0.12 * (1 - distance / 150)})`
            context.lineWidth = 0.5
            context.stroke()
          }
        })
      })
      frame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="technical-field" aria-hidden="true" />
}
