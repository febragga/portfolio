'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ProjectGallery from '@/components/projectgallery';

export default function ProjetoDetailClient({ project, previousProject, nextProject }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.05,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 127, 255, ${particle.opacity})`;
        ctx.fill();
      });

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(74, 127, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="projeto-detalhes">
      <canvas ref={canvasRef} className="projeto-canvas" />
      
      {/* HEADER COM VOLTA */}
      <div className="projeto-header">
        <Link href="/projetos" className="back-link">
          <div className="back-square" />
          <span>Voltar</span>
        </Link>
        <div className="header-line" />
      </div>

      {/* IMAGEM PRINCIPAL */}
      <div className="projeto-hero">
        <img
          src={project.image}
          alt={project.title}
          className="hero-image"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="projeto-content-wrapper">
        <div className="projeto-content">
          {/* TÍTULO E METADADOS */}
          <div className="projeto-info">
            <div className="projeto-title-section">
              <div className="title-square" />
              <h1>{project.title}</h1>
            </div>
            
            <div className="projeto-metadata">
              <div className="meta-item">
                <div className="meta-indicator" />
                <div className="meta-content">
                  <span className="meta-label">Localização</span>
                  <span className="meta-value">{project.location}</span>
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-indicator" />
                <div className="meta-content">
                  <span className="meta-label">Ano</span>
                  <span className="meta-value">{project.year}</span>
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-indicator" />
                <div className="meta-content">
                  <span className="meta-label">Tipologia</span>
                  <span className="meta-value">{project.category}</span>
                </div>
              </div>
              <div className="meta-item meta-item-project-type">
                <div className="meta-indicator" />
                <div className="meta-content">
                  <span className="meta-label">Natureza do projeto</span>
                  <span className="meta-value">{project.projectType}</span>
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-indicator" />
                <div className="meta-content">
                  <span className="meta-label">Status</span>
                  <span className="meta-value">{project.status}</span>
                </div>
              </div>
            </div>

            <div className="projeto-description">
              <p>{project.description}</p>
            </div>
          </div>

          {/* CONTEÚDO ADICIONAL */}
          <div className="projeto-body">
            <p>{project.content}</p>
          </div>
        </div>

        {/* GALERIA DO PROJETO */}
        <ProjectGallery gallery={project.gallery} />
      </div>

      {/* NAVEGAÇÃO ANTERIOR/PRÓXIMO */}
      <div className="projeto-navigation">
        {previousProject ? (
          <Link href={`/projetos/${previousProject.slug}`} className="nav-link prev">
            <div className="nav-square" />
            <div className="nav-content">
              <span className="nav-label">Anterior</span>
              <span className="nav-title">{previousProject.title}</span>
            </div>
            <span className="nav-arrow">←</span>
          </Link>
        ) : (
          <div className="nav-placeholder" />
        )}

        {nextProject ? (
          <Link href={`/projetos/${nextProject.slug}`} className="nav-link next">
            <span className="nav-arrow">→</span>
            <div className="nav-content">
              <span className="nav-label">Próximo</span>
              <span className="nav-title">{nextProject.title}</span>
            </div>
            <div className="nav-square" />
          </Link>
        ) : (
          <div className="nav-placeholder" />
        )}
      </div>
    </main>
  );
}
