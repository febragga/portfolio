export default function Home() {
  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="hero">
        <h2 style={{ border: 'none', fontSize: '3rem' }}>Arquitetura & Design</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          Explorando a intersecção entre o espaço físico e a tecnologia digital.
        </p>
        <a href="/projetos" style={{ background: '#252525', color: 'white', padding: '10px 25px', textDecoration: 'none', borderRadius: '5px' }}>
          Ver Projetos
        </a>
      </div>
    </main>
  )
}