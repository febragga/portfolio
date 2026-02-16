'use client';
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Link href="/projetos" style={{ 
  width: '150px',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none', 
  color: '#191a1c', 
  fontWeight: 500, 
  border: '1px solid #191a1c', 
  borderRadius: '4px', 
  transition: 'all 0.3s ease'
}}
  onMouseEnter={(e) => { e.target.style.background = '#191a1c'; e.target.style.color = '#fff'; }}
  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#191a1c'; }}
>
  Ver Projetos
</Link>
    </main>
  )
}