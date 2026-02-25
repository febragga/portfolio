'use client';

import { useEffect, useRef } from 'react';
import '@/styles/sobre.css';

export default function Sobre() {
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
    const particleCount = 30;

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

  const trajectoryData = [
    {
      id: 0,
      year: '2018',
      title: 'IFTM',
      subtitle: 'Computação Gráfica',
      description: 'Nasci em Uberlândia. Em 2018 realizei o exame para ingresso no Curso de Computação Gráfica integrado ao Ensino Médio do Instituto Federal do Triângulo Mineiro (IFTM), formando-se em 2020. Foram anos de muito aprendizado em programação, modelagem 3D e design.',
      imageUrl: '/database/images/iftm-horizontal-uberlandiacentro.png',
      imageMode: 'contain'
    },
    {
      id: 1,
      year: '2020',
      title: 'UFSCar',
      subtitle: 'Física',
      description: 'Após o ensino médio, cursei brevemente física na Universidade Federal de São Carlos (UFSCar). Em 2023, percebi que sentia falta das atividades técnicas que realizava durante o curso, como programação e modelagem 3D.',
      imageUrl: '/database/images/Ufscar-logo.png',
      imageMode: 'contain'
    },
    {
      id: 2,
      year: '2023',
      title: 'USP',
      subtitle: 'Arquitetura e Urbanismo',
      description: 'Sendo assim, ingressei na Universidade de São Paulo (USP), na capital, onde resido e curso atualmente Arquitetura e Urbanismo. Uma decisão que combina minha paixão por design com a visão de futuro.',
      imageUrl: '/database/images/profile_photo1.jpeg',
      imageMode: 'cover'
    }
  ];

  const skills = [
    { name: 'Blender', proficiency: 90 },
    { name: '3ds Max', proficiency: 75 },
    { name: 'Photoshop', proficiency: 85 },
    { name: 'Illustrator', proficiency: 80 },
    { name: 'InDesign', proficiency: 90 },
    { name: 'SketchUp', proficiency: 85 },
    { name: 'V-Ray', proficiency: 90 },
    { name: 'Enscape', proficiency: 91 },
    { name: 'QGIS', proficiency: 90 },
    { name: 'ArchiCAD', proficiency: 85 },
    { name: 'Revit', proficiency: 20 },
    { name: 'AutoCAD', proficiency: 90 },
    { name: 'Rhino', proficiency: 75 },
    { name: 'Premiere Pro', proficiency: 60 },
    { name: 'After Effects', proficiency: 72 },
  ];

  const certificates = [
    {
      id: 1,
      name: 'Certificado Método Cura',
      issuer: 'Curso Cura',
      date: '28 de Setembro de 2025',
      pdfUrl: '/docs/certificado-metodo-cura.pdf',
    },
    {
      id: 2,
      name: 'Certificado Archicad Cura',
      issuer: 'Curso Cura',
      date: '22 de Fevereiro de 2026',
      pdfUrl: '/docs/certificado-archicad-cura.pdf',
    },
    {
      id: 3,
      name: 'Curriculum Vitae',
      issuer: 'Atualizado em:',
      date: '25 de Fevereiro de 2026',
      pdfUrl: '/docs/CV.pdf',
    },
  ];

  return (
    <main className="sobre-section">
      <canvas ref={canvasRef} className="sobre-canvas" />
      
      <div className="sobre-content">
        {/* TRAJECTORY SECTION */}
        <div className="trajectory-section">
          <div className="section-header">
            <div className="section-title-visual">
              <div className="section-square" />
              <h2>Trajetória</h2>
            </div>
            <div className="section-line" />
          </div>

          <div className="trajectory-grid">
            {trajectoryData.map((item, index) => (
              <div 
                key={item.id} 
                className="trajectory-card"
                style={{ '--delay': index * 0.15 + 's' }}
              >
                <div className="trajectory-year">{item.year}</div>
                <div className="trajectory-image-wrapper">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="trajectory-image"
                      style={{ objectFit: item.imageMode }}
                    />
                  )}
                  <div className="trajectory-overlay" />
                </div>
                <div className="trajectory-info">
                  <h3 className="trajectory-title">{item.title}</h3>
                  <p className="trajectory-subtitle">{item.subtitle}</p>
                  <p className="trajectory-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS SECTION */}
        <div className="skills-section">
          <div className="section-header">
            <div className="section-title-visual">
              <div className="section-square" />
              <h3 className="section-title">Skills & Softwares</h3>
            </div>
            <div className="section-line" />
          </div>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="skill-card"
                style={{ '--delay': index * 0.05 + 's' }}
              >
                <div className="skill-header">
                  <h4 className="skill-name">{skill.name}</h4>
                  <span className="skill-percentage">{skill.proficiency}%</span>
                </div>
                <div className="skill-bar-container">
                  <div 
                    className="skill-bar"
                    style={{ '--width': `${skill.proficiency}%` }}
                  >
                    <div className="skill-bar-fill"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICADOS SECTION */}
        <div className="certificates-section">
          <div className="section-header">
            <div className="section-title-visual">
              <div className="section-square" />
              <h3 className="section-title">Certificados & Credenciais</h3>
            </div>
            <div className="section-line" />
          </div>

          {certificates.length > 0 ? (
            <div className="certificates-grid">
              {certificates.map((cert, index) => (
                <div 
                  key={cert.id}
                  className="certificate-card"
                  style={{ '--delay': index * 0.1 + 's' }}
                >
                  <div className="certificate-thumbnail">
                    {cert.thumbnail ? (
                      <img src={cert.thumbnail} alt={cert.name} />
                    ) : (
                      <div className="certificate-icon">📄</div>
                    )}
                    <div className="certificate-overlay">
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-button"
                        title={`Abrir ${cert.name}`}
                      >
                        Visualizar
                      </a>
                    </div>
                  </div>

                  <div className="certificate-content">
                    <h4 className="certificate-name">{cert.name}</h4>
                    <p className="certificate-issuer">{cert.issuer}</p>
                    <span className="certificate-date">{cert.date}</span>
                    
                    <a
                      href={cert.pdfUrl}
                      download
                      className="certificate-link"
                      title={`Baixar ${cert.name}`}
                    >
                      ⬇️ Baixar PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="certificates-empty">
              <div className="empty-icon">📜</div>
              <p className="empty-text">Nenhum certificado adicionado ainda</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
