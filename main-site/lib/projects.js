export const projects = [
  {
    id: 1,
    slug: 'estudio-a',
    title: 'Estúdio A',
    image: '/img/arquitetura/01_Estúdio_A/render_04.png',
    thumbnail: '/img/arquitetura/01_Estúdio_A/render_04.png',
    category: 'comercial',
    projectType: 'projeto acadêmico',
    location: 'são paulo - sp',
    year: 2025,
    status: 'projeto',
    description: 'Projeto realizado para a disciplina de Construção III, mas com detalhamento interior individual, realizado para a conclusão do curso método cura.',
    content: 'O projeto dispõe de dois banheiros, uma área de lazer superior e um jardim interno, que complementam um espaço de trabalho amplo e bem iluminado. Desenvolvido no SketchUp com renderização no Enscape e pós-edição no Photoshop, o foco deste trabalho não foi a estética exterior, mas sim o rigor técnico exigido pela disciplina. Priorizamos o detalhamento de fundações e elementos estruturais, como muros de arrimo, buscando projetar a "casca" do estúdio de forma fidedigna à realidade construtiva. Houve também uma preocupação central com a insolação e o escoamento d\'água; para isso, realizamos o desenho de shafts com a inclinação correta e grelhas horizontais, unindo a necessidade de luz natural abundante para as atividades artísticas à eficiência do sistema de drenagem.',    // Array de mídia para a galeria
    gallery: [
      {
        id: 'img-01',
        type: 'image',
        src: '/img/arquitetura/01_Estúdio_A/lines.png',
        title: 'Axométrica',
        thumbnail: '/img/arquitetura/01_Estúdio_A/lines.png'
      },
      {
        id: 'img-02',
        type: 'image',
        src: '/img/arquitetura/01_Estúdio_A/render_test.png',
        title: 'Exterior',
        thumbnail: '/img/arquitetura/01_Estúdio_A/render_test.png'
      },
      {
        id: 'img-03',
        type: 'image',
        src: '/img/arquitetura/01_Estúdio_A/render_02.png',
        thumbnail: '/img/arquitetura/01_Estúdio_A/render_02.png',
        title: 'Exterior 2'
      },
      {
        id: 'pdf-01',
        type: 'pdf',
        src: '/img/arquitetura/01_Estúdio_A/Untitled-2.pdf',
        title: 'Descrição Geral',
        poster: '/img/arquitetura/01_Estúdio_A/Untitled-2.pdf'
      }
    ]
  },
  {
    id: 2,
    slug: 'shigeru-ban',
    title: 'Log Paper House',
    image: '/img/arquitetura/02_ShigeruBan/test_2.png',
    thumbnail: '/img/arquitetura/02_ShigeruBan/test_2.png',
    category: 'habitação',
    projectType: 'projeto de extensão',
    location: 'Bienal de Arquitetura de São Paulo',
    year: 2025,
    status: 'concluído',
    description: 'Documentação e montagem do projeto Log Paper House, de Shigeru Ban, na Bienal de Arquitetura de São Paulo.',
    content: 'O projeto é uma residência temporária construída com papelão e engradados de cerveja, projetada para ser sustentável e de baixo custo. Projeto modelado no sketchup, com renderização no 3DS Max/Arnold, e pós-edição no photoshop. Logo após a fase de documentação, mandei os arquivos para que fosse realizada a prancha do projeto (parte em que não tive participação) e enviada para um concurso do IABSP. A exposição foi montada em duas ocasiões: na Bienal, com auxílios de técnicos, e na FAU, apenas com os estudantes que participaram do projeto.',
    gallery: [
      {
        id: 'pdf-01',
        type: 'pdf',
        src: '/img/arquitetura/02_ShigeruBan/front_view_1_20.pdf',
        title: 'Front View 1:20',
        poster: '/img/arquitetura/02_ShigeruBan/front_view_1_20.pdf'
      },
      {
        id: 'pdf-02',
        type: 'pdf',
        src: '/img/arquitetura/02_ShigeruBan/iso_1_20.pdf',
        title: 'Iso View 1:20',
        poster: '/img/arquitetura/02_ShigeruBan/iso_1_20.pdf'
      },
            {
        id: 'pdf-03',
        type: 'pdf',
        src: '/img/arquitetura/02_ShigeruBan/left_view_1_20.pdf',
        title: 'Left View 1:20',
        poster: '/img/arquitetura/02_ShigeruBan/left_view_1_20.pdf'
      },
      {
        id: 'pdf-04',
        type: 'pdf',
        src: '/img/arquitetura/02_ShigeruBan/right_view_1_20.pdf',
        title: 'Right View 1:20',
        poster: '/img/arquitetura/02_ShigeruBan/right_view_1_20.pdf'
      },
      {
        id: 'img-01',
        type: 'image',
        src: '/img/arquitetura/02_ShigeruBan/test_1.png',
        title: 'Iso Night View Render',
        thumbnail: '/img/arquitetura/02_ShigeruBan/test_1.png'
      },
      {
        id: 'img-02',
        type: 'image',
        src: '/img/arquitetura/02_ShigeruBan/test_3.png',
        title: 'Front View Render',
        thumbnail: '/img/arquitetura/02_ShigeruBan/test_3.png'
      },
      {
        id: 'img-03',
        type: 'image',
        src: '/img/arquitetura/02_ShigeruBan/build.jpg',
        title: 'Front View Render',
        thumbnail: '/img/arquitetura/02_ShigeruBan/build.jpg'
      }
    ]
  },
  {
    id: 3,
    slug: 'terracota',
    title: 'Interior Terracota',
    image: '/img/arquitetura/03_Interior_Terracota/untitled.png',
    thumbnail: '/img/arquitetura/03_Interior_Terracota/untitled.png',
    category: 'habitação',
    projectType: 'projeto pessoal',
    location: '-',
    year: 2024,
    status: 'projeto',
    description: 'Render feito no blender, de uma cena simples de um canto de sala',
    content: 'O projeto explora a paleta de cores terracota, com muxarabis e texturas rústicas, criando um ambiente acolhedor. Foi um dos primeiros projetos que fiz para retomar minhas atividades no Blender, relembrando alguns conceitos que aprendi durante o ensino médio. Foi rápido e divertido.',
    gallery: []
  },
  {
    id: 4,
    slug: 'projeto-2',
    title: 'Edifício Flamboyant',
    image: '/img/arquitetura/04_Projeto2/Image.png',
    thumbnail: '/img/arquitetura/04_Projeto2/Image.png',
    category: 'Uso misto',
    projectType: 'projeto acadêmico',
    location: 'são paulo - sp',
    year: 2024,
    status: 'concluído',
    description: 'Edifício de uso misto localizado em São Paulo, com áreas comerciais no térreo e residenciais nos andares superiores.',
    content: 'Projeto realizado na disciplina de Projeto II. Feito no Archicad e renderizado no D5 Render. Este projeto, desenvolvido na disciplina de Projeto II, foi um divisor de águas para mim. Foi o momento em que eu percebi: diante do rigor do professor Spadoni, percebi o abismo de conhecimento que ainda existia entre a minha visão de aluno, a realidade da arquitetura e a visão do professor. Longe de me desanimar, esse choque de realidade, somado ao apoio fundamental do monitor da disciplina, me fez mergulhar de cabeça no processo. Foi minha primeira experiência séria utilizando o Archicad, onde cada parede e cada linha me provocavam a buscar um propósito. O texto do Rafael Moneo sobre a arbitrariedade da arquitetura, recomendado pelo monitor, foi ímpar nesse sentido. Busquei o real, o absoluto, tentando traduzir no software o nível de detalhe que o projeto exigia. Mais do que um trabalho acadêmico, foi o projeto onde aprendi um pedaço do que significa projetar.',
    gallery: [            
      {
        id: 'img-01',
        type: 'image',
        src: '/img/arquitetura/04_Projeto2/image2.png',
        title: 'Front View Render',
        thumbnail: '/img/arquitetura/04_Projeto2/image2.png'
      },
      {
        id: 'img-02',
        type: 'image',
        src: '/img/arquitetura/04_Projeto2/implantação.1.png',
        title: 'Implantação',
        thumbnail: '/img/arquitetura/04_Projeto2/implantação.1.png'
      },
      {
        id: 'img-03',
        type: 'image',
        src: '/img/arquitetura/04_Projeto2/Plantas23.jpg',
        title: 'Plantas Andares 2 e 3',
        thumbnail: '/img/arquitetura/04_Projeto2/Plantas23.jpg'
      },
      {
        id: 'img-04',
        type: 'image',
        src: '/img/arquitetura/04_Projeto2/Santa_Cecília.png',
        title: 'Localização Bairro',
        thumbnail: '/img/arquitetura/04_Projeto2/Santa_Cecília.png'
      }
    ]
  },
  {
    id: 5,
    slug: 'ed-solaris',
    title: 'Edifício Solaris',
    image: '/img/arquitetura/05_EdConstrução/unnamed.jpg',
    thumbnail: '/img/arquitetura/05_EdConstrução/unnamed.jpg',
    category: 'coorporativo',
    projectType: 'projeto acadêmico',
    location: 'são paulo - sp',
    year: 2025,
    status: 'projeto',
    description: 'Edifício corporativo com restaurante na cobertura.',
    content: 'Projeto realizado na disciplina de Construção IV, explorando técnicas elementares de construção, detalhamento de revestimentos (os quais não foram adicionadas aqui), caimento de telhados, e escoamento d\'água.',
    gallery: [
      {
        id: 'pdf-01',
        type: 'pdf',
        src: '/img/arquitetura/05_EdConstrução/building_logo.pdf',
        title: 'Logo',
        poster: '/img/arquitetura/05_EdConstrução/building_logo.pdf'
      },
      {
        id: 'pdf-02',
        type: 'pdf',
        src: '/img/arquitetura/05_EdConstrução/Cobertura-A4 (5).pdf',
        title: 'Planta da Cobertura',
        poster: '/img/arquitetura/05_EdConstrução/Cobertura-A4 (5).pdf'
      }
    ]
  },
  {
    id: 6,
    slug: 'casa-do-lago',
    title: 'Casa do Lago',
    image: '/img/arquitetura/06_casa_do_lago/2_ps_pp.png',
    thumbnail: '/img/arquitetura/06_casa_do_lago/2_ips.png',
    category: 'habitação unifamiliar',
    projectType: 'projeto pessoal',
    location: 'uberlândia - mg',
    year: 2026,
    status: 'projeto',
    description: 'Projeto realizado para portfólio, de uma casa de campo localizada às margens de um lago, com grandes janelas e integração com a natureza.',
    content: 'Projeto idelizado com desenhos à mão, modelado inicialmente no rhino, para idelização do espaço, com os terrenos e o lago traçados geoespacialmente pelo QGIS, e com os renders interiores feitos no 3DS Max, junto ao Corona Renderer, com os renders pós-editados no photoshop. Tempo de projeto: 2 semanas.',
    gallery: [
      {
        id: 'pdf-01',
        type: 'pdf',
        src: '/img/arquitetura/06_casa_do_lago/rascunhos de projeto.pdf',
        title: 'rascunhos de projeto',
        poster: '/img/arquitetura/06_Casa_do_Lago/rascunhos de projeto.pdf'
      },
      {
        id: 'img-01',
        type: 'image',
        src: '/img/arquitetura/06_casa_do_lago/2.png',
        title: 'Render Exterior',
        thumbnail: '/img/arquitetura/06_casa_do_lago/2.png'
      },
      {
        id: 'img-02',
        type: 'image',
        src: '/img/arquitetura/06_casa_do_lago/2_ip.png',
        title: 'Render Interior',
        thumbnail: '/img/arquitetura/06_casa_do_lago/2_ip.png'
      },
      {
        id: 'img-03',
        type: 'image',
        src: '/img/arquitetura/06_casa_do_lago/2_ips.png',
        title: 'Render Conceitual',
        thumbnail: '/img/arquitetura/06_casa_do_lago/2_ips.png'
      },
      {
        id: 'pdf-02',
        type: 'pdf',
        src: '/img/arquitetura/06_casa_do_lago/01_plantas/01_plantas.pdf',
        title: 'Plantas de Projeto',
        thumbnail: '/img/arquitetura/06_casa_do_lago/01_plantas/01_plantas.pdf'
      },
      {
        id: 'pdf-03',
        type: 'pdf',
        src: '/img/arquitetura/06_casa_do_lago/02_cortes/02_cortes.pdf',
        title: 'Cortes de Projeto',
        thumbnail: '/img/arquitetura/06_casa_do_lago/02_cortes/02_cortes.pdf'
      }
    ]
  },
  {
    id: 7,
    slug: 'desenhos',
    title: 'Desenhos',
    image: '/img/desenhos/Untitled-1.png',
    thumbnail: '/img/desenhos/Untitled-2.png',
    category: 'desenhos',
    projectType: 'projeto pessoal',
    location: '-',
    year: '-',
    status: 'concluído',
    description: 'Alguns desenhos aleatórios, feitos à mão, outros digitais...',
    content: 'Conteúdo completo sobre os desenhos...',
    gallery: [
      {
        id: 'img-01',
        type: 'image',
        src: '/img/desenhos/Untitled-1.png',
        title: 'Desenho 01',
        thumbnail: '/img/desenhos/Untitled-1.png'
      },
            {
        id: 'img-02',
        type: 'image',
        src: '/img/desenhos/cow-1.png',
        title: 'Desenho 02',
        thumbnail: '/img/desenhos/cow-1.png'
      },
            {
        id: 'img-03',
        type: 'image',
        src: '/img/desenhos/salmao.png',
        title: 'Desenho 03',
        thumbnail: '/img/desenhos/salmao.png'
      },
            {
        id: 'img-04',
        type: 'image',
        src: '/img/desenhos/Untitled-2.png',
        title: 'Desenho 04',
        thumbnail: '/img/desenhos/Untitled-2.png'
      }
    ]
  },
  {
    id: 8,
    slug: 'objetos-3d',
    title: 'Objetos 3D',
    image: '/img/objetos/02_REDblueChair/render_5.jpg',
    thumbnail: '/img/objetos/02_REDblueChair/render_5.jpg',
    category: 'Objeto 3D',
    projectType: 'projeto pessoal',
    location: '-',
    year: '–',
    status: 'concluído',
    description: 'Coleção de modelagens 3D: Red Blue Chair, inspirada na obra de Gerrit Rietveld; MB Wassily, inspirada na obra de Marcel Breuer; Postal Mail, uma caixa de correio com texturização detalhada; Eero Saarinen Womb, inspirada na obra de Eero Saarinen; e um fone de ouvido.',
    content: 'A Red Blue Chair, a MB Wassily, a Eero Saarinen Womb e o fone de ouvido foram feitos no 3DS Max, com renderização no Arnold. O Postal Mail foi feito no Blender, renderizado no Cycles e recebeu texturas criadas no Substance Painter. Esse último foi também um projeto para relembrar e retomar meus estudos no Blender, recordando o tempo em que era comum fazer animações na escola.',
    gallery: [
      {
        id: 'red-blue-chair-cover',
        type: 'image',
        src: '/img/objetos/02_REDblueChair/render_5.jpg',
        title: 'Red Blue Chair — Render 01',
        thumbnail: '/img/objetos/02_REDblueChair/render_5.jpg'
      },
      {
        id: 'red-blue-chair-02',
        type: 'image',
        src: '/img/objetos/02_REDblueChair/render_3.jpg',
        title: 'Red Blue Chair — Render 02',
        thumbnail: '/img/objetos/02_REDblueChair/render_3.jpg'
      },
      {
        id: 'mb-wassily-cover',
        type: 'image',
        src: '/img/objetos/03_MBWassily/02_renders/1.jpg',
        title: 'MB Wassily — Render 01',
        thumbnail: '/img/objetos/03_MBWassily/02_renders/1.jpg'
      },
      {
        id: 'mb-wassily-02',
        type: 'image',
        src: '/img/objetos/03_MBWassily/02_renders/2.jpg',
        title: 'MB Wassily — Render 02',
        thumbnail: '/img/objetos/03_MBWassily/02_renders/2.jpg'
      },
      {
        id: 'postal-mail-cover',
        type: 'image',
        src: '/img/objetos/04_Post_Mail_Texture_Painting/1.png',
        title: 'Postal Mail — Render',
        thumbnail: '/img/objetos/04_Post_Mail_Texture_Painting/1.png'
      },
      {
        id: 'postal-mail-video',
        type: 'video',
        src: '/img/objetos/04_Post_Mail_Texture_Painting/05_DaVinci/final_07.mp4',
        title: 'Postal Mail — Cena de Movimento',
        thumbnail: '/img/objetos/04_Post_Mail_Texture_Painting/1.png'
      },
      {
        id: 'eero-saarinen-womb-cover',
        type: 'image',
        src: '/img/objetos/05_EeroSaarinenWomb/02_renders/1.jpg',
        title: 'Eero Saarinen Womb — Render 01',
        thumbnail: '/img/objetos/05_EeroSaarinenWomb/02_renders/1.jpg'
      },
      {
        id: 'eero-saarinen-womb-02',
        type: 'image',
        src: '/img/objetos/05_EeroSaarinenWomb/02_renders/2.jpg',
        title: 'Eero Saarinen Womb — Render 02',
        thumbnail: '/img/objetos/05_EeroSaarinenWomb/02_renders/2.jpg'
      },
      {
        id: 'eero-saarinen-womb-03',
        type: 'image',
        src: '/img/objetos/05_EeroSaarinenWomb/02_renders/3.jpg',
        title: 'Eero Saarinen Womb — Render 03',
        thumbnail: '/img/objetos/05_EeroSaarinenWomb/02_renders/3.jpg'
      },
      {
        id: 'earphone-cover',
        type: 'image',
        src: '/img/objetos/07_Earphone/02_renders/1.jpg',
        title: 'Earphone — Render 01',
        thumbnail: '/img/objetos/07_Earphone/02_renders/1.jpg'
      },
      {
        id: 'earphone-02',
        type: 'image',
        src: '/img/objetos/07_Earphone/02_renders/2.jpg',
        title: 'Earphone — Render 02',
        thumbnail: '/img/objetos/07_Earphone/02_renders/2.jpg'
      }
    ]
  },
  {
    id: 13,
    slug: 'escola',
    title: 'Escola',
    image: '/img/arquitetura/07_Escola/IN PROGRESS.jpg',
    thumbnail: '/img/arquitetura/07_Escola/IN PROGRESS.jpg',
    category: 'edifício público',
    projectType: 'projeto acadêmico',
    location: 'são paulo - sp',
    year: 2026,
    status: 'não concluído',
    description: 'Trabalho em andamento para a disciplina AUP0193 - Optativa/Projeto IV',
    content: 'Em progresso.', 
    gallery: [
      {
        id: 'pdf-01',
        type: 'pdf',
        src: '/img/arquitetura/07_Escola/base_reading/conjunto1.pdf',
        title: 'Leitura de Território',
        poster: '/img/arquitetura/07_Escola/base_reading/conjunto1.pdf'
      }
    ]
  },
  {
    id: 14,
    slug: 'escola-lele',
    title: 'Escola Transitória Modelo Rural',
    image: '/img/arquitetura/08_lele/explodida4.png',
    thumbnail: '/img/arquitetura/08_lele/explodida4.png',
    category: 'edifício público',
    projectType: 'projeto acadêmico',
    location: 'abadiânia - go',
    year: 2025,
    status: 'concluído',
    description: 'Trabalho feito como parte do método avaliativo da disciplina de Arquitetura e Insdústria',
    content: 'O trabalho contemplou diversas partes de execução: Pesquisa, Modelgem, Renderização, e design da prancha resumo. No ínicio, tinhamos que documentar de forma precisa e fidedigna a obra de Lelé, explicando cada componente, fazendo também uma maquete de um elemento construtivo que tivemos um maior interesse, no qual foi escolhido a viga de um perfil complexo. Fizemos também um modelo 3D, 1:1, com fins de aprofundar nosso conhecimento em relação à obra. Foi uma ótima experiência de aprendizado em diversas áreas: InDesign, Photoshop, Sketchup, Layout(SKP), D5 Renderer, Enscape e Illustrator', 
    gallery: [
      {
        id: 'pdf-01',
        type: 'pdf',
        src: '/img/arquitetura/08_lele/lelé-A2-v6.pdf',
        title: 'Prancha A2',
        poster: '/img/arquitetura/08_lele/lelé-A2-v6.pdf'
      },
      {
        id: 'img-01',
        type: 'image',
        src: '/img/arquitetura/08_lele/Enscape_2025-04-28-17-14-02.png',
        title: 'Render Exterior',
        poster: '/img/arquitetura/08_lele/Enscape_2025-04-28-17-14-02.png'
      },
      {
        id: 'img-02',
        type: 'image',
        src: '/img/arquitetura/08_lele/test.png',
        title: 'Render Estilizado Exterior',
        poster: '/img/arquitetura/08_lele/test.png'
      },
      {
        id: 'img-03',
        type: 'image',
        src: '/img/arquitetura/08_lele/Image(1).png',
        title: 'Render Interior',
        poster: '/img/arquitetura/08_lele/Image(1).png'
      },
    ]
  },
  {
    id: 15,
    slug: 'biblioteca-aml',
    title: 'Biblioteca Alceu Amoroso Lima',
    image: '/img/arquitetura/09_Biblioteca_AML/desenho_geral.png',
    thumbnail: '/img/arquitetura/09_Biblioteca_AML/desenho_geral.png',
    category: 'edifício público',
    projectType: 'projeto acadêmico',
    location: 'são paulo - sp',
    year: 2026,
    status: 'concluído',
    description: 'Trabalho feito como parte do método avaliativo da disciplina de Conforto IV',
    content: 'O trabalho contemplou uma nova abordagem de análise térmica a partir do uso de plugins do Rhinoceros como o LadyBug e o Honeybee. Enquanto isso, a modelagem do edifício foi feita a partir de plantas públicas, achadas em sites da internet, e modeladas no Sketchup, com base também nas medições feitas em campo. O projeto foi uma experiência muito enriquecedora e uma forte demonstração da capacidade desses plugnis.', 
    gallery: [
      {
        id: 'pdf-01',
        type: 'pdf',
        src: '/img/arquitetura/09_Biblioteca_AML/analise_antes.pdf',
        title: 'Análise Térmica Antes da Intervenção com Brises',
        poster: '/img/arquitetura/09_Biblioteca_AML/analise_antes.pdf'
      },
      {
        id: 'pdf-02',
        type: 'pdf',
        src: '/img/arquitetura/09_Biblioteca_AML/analise_depois.pdf',
        title: 'Análise Térmica Depois da Intervenção com Brises',
        poster: '/img/arquitetura/09_Biblioteca_AML/analise_depois.pdf'
      },
      {
        id: 'img-01',
        type: 'image',
        src: '/img/arquitetura/09_Biblioteca_AML/desenho_geral.png',
        title: 'Desenho Geral',
        poster: '/img/arquitetura/09_Biblioteca_AML/desenho_geral.png'
      },
      {
        id: 'img-02',
        type: 'image',
        src: '/img/arquitetura/09_Biblioteca_AML/building_3D_antes.png',
        title: 'Building 3D Antes da Intervenção com Brises',
        poster: '/img/arquitetura/09_Biblioteca_AML/building_3D_antes.png'
      },
      {
        id: 'img-03',
        type: 'image',
        src: '/img/arquitetura/09_Biblioteca_AML/building_3D_depois.png',
        title: 'Building 3D Depois da Intervenção com Brises',
        poster: '/img/arquitetura/09_Biblioteca_AML/building_3D_depois.png'
      },
      {
        id: 'img-04',
        type: 'image',
        src: '/img/arquitetura/09_Biblioteca_AML/corte_3D_antes.png',
        title: 'Corte 3D Antes da Intervenção com Brises',
        poster: '/img/arquitetura/09_Biblioteca_AML/corte_3D_antes.png'
      },
      {
        id: 'img-05',
        type: 'image',
        src: '/img/arquitetura/09_Biblioteca_AML/corte_3D_depois.png',
        title: 'Corte 3D Depois da Intervenção com Brises',
        poster: '/img/arquitetura/09_Biblioteca_AML/corte_3D_depois.png'
      },
      {
        id: 'img-06',
        type: 'image',
        src: '/img/arquitetura/09_Biblioteca_AML/termo_building.png',
        title: 'Edifício sobre análise de incidência solar durante o ano todo',
        poster: '/img/arquitetura/09_Biblioteca_AML/termo_building.png'
      },
      {
        id: 'img-07',
        type: 'image',
        src: '/img/arquitetura/09_Biblioteca_AML/termo_building_2.png',
        title: 'Edifício sobre análise de incidência solar durante o ano todo, ângulo 2',
        poster: '/img/arquitetura/09_Biblioteca_AML/termo_building_2.png'
      },
    ]
  },
]

// Extrair categorias, localizações e anos únicos automaticamente
export const getCategories = () => [...new Set(projects.map(p => p.category))].sort()
export const getProjectTypes = () => [...new Set(projects.map(p => p.projectType))].sort()
export const getLocations = () => [...new Set(projects.map(p => p.location))].filter(l => l && l !== '-').sort()
export const getYears = () => [...new Set(projects.map(p => p.year))].sort((a, b) => b - a)
export const getStatus = () => [...new Set(projects.map(p => p.status))]

export const formatLabel = (value) => {
  if (!value || value === '-') return 'Sem localização'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

// Buscar projeto por slug
export const getProjectBySlug = (slug) => projects.find(p => p.slug === slug)
