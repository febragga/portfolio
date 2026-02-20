'use client';

import { useEffect, useRef } from 'react';
import '@/styles/contato.css';

export default function Contato() {
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
        ctx.fillStyle = `rgba(0, 56, 186, ${particle.opacity})`;
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
            ctx.strokeStyle = `rgba(0, 56, 186, ${0.08 * (1 - distance / 100)})`;
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
    <main className="contato-container">
      <canvas ref={canvasRef} className="contato-canvas" />
      
      <div className="contato-content">
        <div className="contato-header">
          <div className="contato-title-visual">
            <div className="title-square" />
            <h2>Contato</h2>
          </div>
          <div className="contato-line" />
        </div>

        <div className="contato-grid">
          <div className="contact-item" style={{ '--delay': '0.1s' }}>
            <div className="contact-icon-wrapper">
              <div className="contact-icon-square" />
            </div>
            <div className="contact-info">
              <span className="contact-label">E-mail</span>
              <a href="mailto:f_bragga@icloud.com" className="contact-value">
                f_bragga@icloud.com
              </a>
            </div>
          </div>

          <div className="contact-item" style={{ '--delay': '0.2s' }}>
            <div className="contact-icon-wrapper">
              <div className="contact-icon-square" />
            </div>
            <div className="contact-info">
              <span className="contact-label">Telefone</span>
              <span className="contact-value">(11) 91774-4243</span>
            </div>
          </div>

          <div className="contact-item" style={{ '--delay': '0.3s' }}>
            <div className="contact-icon-wrapper">
              <div className="contact-icon-square" />
            </div>
            <div className="contact-info">
              <span className="contact-label">Instagram</span>
              <a 
                href="https://instagram.com/inf_bragga" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-value"
              >
                @inf_bragga
              </a>
            </div>
          </div>

          <div className="contact-item" style={{ '--delay': '0.4s' }}>
            <div className="contact-icon-wrapper">
              <div className="contact-icon-square" />
            </div>
            <div className="contact-info">
              <span className="contact-label">LinkedIn</span>
              <a 
                href="https://www.linkedin.com/in/fe-braga-arq/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-value"
              >
                /in/fe-braga-arq
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
