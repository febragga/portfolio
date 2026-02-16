'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function YourComponent() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main style={{ 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isExpanded ? '200vmax' : '0px',
        height: isExpanded ? '200vmax' : '0px',
        background: '#191a1c',
        zIndex: 999,
        transition: 'all 0.5s ease',
      }} />

      <Link href="/projetos" style={{ 
        width: '300px',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none', 
        color: '#191a1c', 
        fontWeight: 500, 
        border: '1px solid #191a1c', 
        borderRadius: '4px', 
        transition: 'all 0.3s ease',
        marginLeft: '0px',
        background: isExpanded ? '#191a1c' : 'transparent',
        color: isExpanded ? '#fff' : '#191a1c',
        cursor: 'pointer',
        zIndex: 1000
      }}
        onMouseEnter={(e) => { if(!isExpanded) { e.target.style.background = '#191a1c'; e.target.style.color = '#fff'; } }}
        onMouseLeave={(e) => { if(!isExpanded) { e.target.style.background = 'transparent'; e.target.style.color = '#191a1c'; } }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        ◼
      </Link>
    </main>
  );
}