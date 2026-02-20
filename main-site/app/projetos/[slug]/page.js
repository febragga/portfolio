import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import ProjectGallery from '@/components/projectgallery';
import ProjetoDetailClient from './projeto-detail-client';
import '@/styles/projeto-detalhes.css';

export default async function ProjetoDetail({ params }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Encontrar próximo e anterior projeto
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <ProjetoDetailClient 
      project={project}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  );
}

// Gerar estaticamente as páginas dos projetos
export async function generateStaticParams() {
  return projects.map(project => ({
    slug: project.slug,
  }));
}
