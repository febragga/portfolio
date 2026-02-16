'use client';

import { useState } from 'react';
import '@/styles/sobre.css';

export default function Sobre() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const trajectoryData = [
    {
      id: 0,
      year: '2018',
      title: 'IFTM',
      subtitle: 'Computação Gráfica',
      description: 'Nasci em Uberlândia. Em 2018 realizei o exame para ingresso no Curso de Computação Gráfica integrado ao Ensino Médio do Instituto Federal do Triângulo Mineiro (IFTM), formando-se em 2020. Foram anos de muito aprendizado em programação, modelagem 3D e design.',
      position: 15
    },
    {
      id: 1,
      year: '2020',
      title: 'UFSCar',
      subtitle: 'Física',
      description: 'Após o ensino médio, cursei brevemente física na Universidade Federal de São Carlos (UFSCar). Em 2023, percebi que sentia falta das atividades técnicas que realizava durante o curso, como programação e modelagem 3D.',
      position: 50
    },
    {
      id: 2,
      year: '2023',
      title: 'USP',
      subtitle: 'Arquitetura e Urbanismo',
      description: 'Sendo assim, ingressei na Universidade de São Paulo (USP), na capital, onde resido e curso atualmente Arquitetura e Urbanismo. Uma decisão que combina minha paixão por design com a visão de futuro.',
      position: 85
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

  // Array de certificados - você pode preencher com seus dados
  const certificates = [
    {
      id: 1,
      name: 'Certificado de Proficiência em Blender',
      issuer: 'Plataforma XYZ',
      date: 'Março 2023',
      pdfUrl: '/docs/certificado-blender.pdf',
      thumbnail: '/img/certificados/thumb-blender.png', // opcional
    },
    {
      id: 2,
      name: 'Curso Avançado de Modelagem 3D',
      issuer: 'Escola de Design',
      date: 'Janeiro 2023',
      pdfUrl: '/docs/certificado-modelagem.pdf',
      thumbnail: '/img/certificados/thumb-modelagem.png',
    },
  ];

  return (
    <main className="sobre-section">
      {/* HEADER - TRAJETÓRIA */}
      <div className="sobre-header">
        <div className="title-accent"></div>
        <h2 className="section-title">Minha Trajetória</h2>
      </div>

      {/* TIMELINE INTERATIVA */}
      <div className={`timeline-container ${selectedPoint === null ? 'expanded' : ''}`}>
        <div className={`timeline-track ${selectedPoint !== null ? 'collapsed' : 'expanded'}`}>
          {/* SVG com trilha suavizada */}
          <svg className="timeline-svg" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet">
            {/* Trilha de fundo - RETA E PONTILHADA */}
            <path
              className="track-path"
              d="M 0 100 L 1000 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8,6"
              strokeLinecap="round"
            />
            
            {/* Pontos da trilha */}
            {trajectoryData.map((point) => (
              <g
                key={point.id}
                className={`timeline-point ${selectedPoint === point.id ? 'active' : ''}`}
              >
                <circle
                  cx={(point.position / 100) * 1000}
                  cy={100}
                  r="14"
                  className="point-circle"
                  onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
                />
                <text
                  x={(point.position / 100) * 1000}
                  y={140}
                  className="point-label"
                  onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
                >
                  {point.year}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* PAINEL LATERAL - INFO TRAJETÓRIA */}
        {selectedPoint !== null && (
          <div className="trajectory-panel">
            <div className="panel-accent"></div>
            <div className="panel-content">
              <div className="panel-year">{trajectoryData[selectedPoint].year}</div>
              <h3 className="panel-title">{trajectoryData[selectedPoint].title}</h3>
              <p className="panel-subtitle">{trajectoryData[selectedPoint].subtitle}</p>
              <p className="panel-description">{trajectoryData[selectedPoint].description}</p>
            </div>
          </div>
        )}
      </div>

      {/* SKILLS SECTION */}
      <div className="skills-section">
        <div className="skills-header">
          <div className="skills-accent"></div>
          <h3 className="skills-title">Skills & Softwares</h3>
        </div>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className="skill-card"
              style={{ '--delay': `${index * 0.05}s` }}
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
        <div className="certificates-header">
          <div className="certificates-accent"></div>
          <h3 className="certificates-title">Certificados & Credenciais</h3>
        </div>

        {certificates.length > 0 ? (
          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div 
                key={cert.id}
                className="certificate-card"
                style={{ '--delay': `${index * 0.05}s` }}
              >
                {/* Thumbnail */}
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
                      👁️ Visualizar
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="certificate-content">
                  <h4 className="certificate-name">{cert.name}</h4>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  <span className="certificate-date">{cert.date}</span>
                  
                  {/* Botão de download */}
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
    </main>
  );
}