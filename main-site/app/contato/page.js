export default function Contato() {
  return (
    <main>
      <h2>Contato</h2>
      <div className="content-grid">
        {/* Lembre-se: esta imagem deve estar em public/database/images/contact_icons.png */}
        <img src="/database/images/contact_icons.png" alt="Contato" />
        
        <div className="text-content">
          <p></p>
          <ul style={{ listStyle: 'none', marginTop: '20px' }}>
            
            <li style={{ marginBottom: '15px' }}>
              <strong>E-mail:</strong> <br />
              <a style={{ color: 'var(--text-color)' }}>
                f_bragga@icloud.com
              </a>
            </li>

            <li style={{ marginBottom: '15px' }}>
              <strong>Telefone:</strong> <br />
              <span>(11) 91774-4243</span>
            </li>

            <li style={{ marginBottom: '15px' }}>
              <strong>Instagram:</strong> <br />
              <a 
                href="https://instagram.com/inf_bragga" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--link-color)' }}
              >
                @inf_bragga
              </a>
            </li>

            <li style={{ marginBottom: '15px' }}>
              <strong>LinkedIn:</strong> <br />
              <a 
                href="https://www.linkedin.com/in/fe-braga-arq/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--link-color)' }}
              >
                /in/fe-braga-arq
              </a>
            </li>

          </ul>
        </div>
      </div>
    </main>
  );
}