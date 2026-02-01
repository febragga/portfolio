export default function Projetos() {
  return (
    <main>
      <h2>Projetos Selecionados</h2>
      
      <div className="projects-grid">
        {/* Projeto 1 */}
        <div className="project-card">
          {/* Certifique-se de que a imagem esteja em public/img/projeto1.jpg */}
          <img src="/img/projeto1.jpg" alt="Projeto Residencial" />
          <div className="project-info">
            <h3>Projeto Residencial</h3>
            <p>Descrição breve do projeto arquitetônico...</p>
          </div>
        </div>

        {/* Projeto 2 */}
        <div className="project-card">
          <img src="/img/projeto2.jpg" alt="Modelagem 3D" />
          <div className="project-info">
            <h3>Modelagem 3D</h3>
            <p>Renderização feita no Blender.</p>
          </div>
        </div>

        {/* Você pode copiar e colar o bloco acima para adicionar mais projetos futuramente */}
      </div>
    </main>
  );
}