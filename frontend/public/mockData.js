// frontend/public/mockData.js - Banco de Dados de Modalidades, Instrutores, Estrutura e FAQ do Combat Hub (Template Modelo)

const COMBAT_MODALITIES = [
  {
    id: "muay-thai",
    name: "Muay Thai Tradicional",
    category: "Striking Tailandês",
    badge: "Arte das 8 Armas",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80",
    desc: "Socos, chutes com a canela, joelhadas cortantes, cotoveladas e clinch tailandês. O treino mais dinâmico para queima calórica (+800 kcal/aula) e reflexos afiados.",
    highlights: ["Queima Calórica Alta", "Condicionamento Total", "Clinch & Cotoveladas", "Turmas Kids e Adultos"],
    target: "Iniciantes, Mulheres, Crianças e Atletas",
    scheduleSummary: "Seg a Sex (Manhã, Tarde e Noite) | Sábado"
  },
  {
    id: "jiu-jitsu",
    name: "Jiu-Jitsu Brasileiro (BJJ)",
    category: "Grappling & Arte Suave",
    badge: "Domínio no Chão",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&auto=format&fit=crop&q=80",
    desc: "A arte marcial baseada em alavancas, raspagens e finalizações (chaves de braço, triângulos e estrangulamentos). Onde a técnica supera a força física.",
    highlights: ["Com Kimono (Gi) & Sem Kimono (No-Gi)", "Graduação Oficial de Faixas", "Xadrez Corporal", "Respeito e Irmandade"],
    target: "Todas as Idades e Níveis Técnicos",
    scheduleSummary: "Seg a Sáb (Manhã, Noite e Open Mat)"
  },
  {
    id: "boxe",
    name: "Boxe Clássico",
    category: "Nobre Arte",
    badge: "Mãos de Aço",
    image: "https://images.unsplash.com/photo-1509563423944-b791c380791c?w=800&auto=format&fit=crop&q=80",
    desc: "Evolua seu jogo de pernas, pêndulos defensivos, esquivas cirúrgicas e combinações devastadoras de jab, direto, cruzado e uppercut em sacos pesados e manoplas.",
    highlights: ["Trabalho de Pernas e Esquivas", "Fortalecimento do Core", "Treino em Sacos Pesados", "Sparring Técnico Controlado"],
    target: "Iniciantes ao Alto Rendimento",
    scheduleSummary: "Seg, Qua e Sex (07h, 12h, 18h e 19h)"
  },
  {
    id: "mma",
    name: "MMA (Mixed Martial Arts)",
    category: "Combate Misto",
    badge: "Octógono & Grade",
    image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=800&auto=format&fit=crop&q=80",
    desc: "A integração completa das modalidades: striking em pé, transições de grade, quedas do wrestling e finalizações no solo. Para quem busca a máxima preparação.",
    highlights: ["Treino em Cage / Grade Oficial", "Transições em Pé e Solo", "Ground and Pound Técnico", "Preparação Física de Elite"],
    target: "Praticantes Intermediários e Avançados",
    scheduleSummary: "Ter e Qui (20h às 21h30) | Sex (Sparring)"
  },
  {
    id: "kickboxing",
    name: "Kickboxing & K-1 Rules",
    category: "Potência & Ritmo",
    badge: "Explosão Total",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    desc: "A união dos socos contundentes do boxe com chutes circulares rápidos e low kicks na coxa. Treinos explosivos que esculpem o corpo e aumentam a resistência cardiovascular.",
    highlights: ["Combinações Rápidas", "Defesa Ativa e Contra-Ataque", "Fortalecimento de Pernas", "Alta Queima de Gordura"],
    target: "Público Masculino, Feminino e Juvenil",
    scheduleSummary: "Ter e Qui (18h às 19h30)"
  },
  {
    id: "taekwondo",
    name: "Taekwondo Olímpico",
    category: "Arte Marcial Coreana",
    badge: "Precisão & Chutes",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&auto=format&fit=crop&q=80",
    desc: "Chutes voadores, giratórios e velocidade dinâmica com foco em disciplina, flexibilidade extraordinária e autocontrole. Excelente pedagogia esportiva infantil.",
    highlights: ["Chutes Rápidos e Giratórios", "Flexibilidade Extrema", "Graduação de Faixas e Dans", "Formação de Caráter Infantil"],
    target: "Crianças a partir de 5 anos e Adultos",
    scheduleSummary: "Ter e Qui (17h Kids / 18h Adultos)"
  },
  {
    id: "judo",
    name: "Judô & Submission Grappling",
    category: "Quedas & Alavancas",
    badge: "Caminho Suave",
    image: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=800&auto=format&fit=crop&q=80",
    desc: "Uso inteligente da força e equilíbrio do oponente contra ele mesmo. Domínio de quedas espetaculares (ippon), projeções corporais e controle no solo.",
    highlights: ["Projeções e Quedas Perfeitas", "Equilíbrio e Postura Inabalável", "Disciplina e Tradição", "Defesa Pessoal Eficaz"],
    target: "Infantil, Juvenil e Adulto",
    scheduleSummary: "Seg e Qua (17h e 19h)"
  },
  {
    id: "defesa-pessoal",
    name: "Defesa Pessoal & Krav Maga",
    category: "Autoproteção Real",
    badge: "Segurança Urbana",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80",
    desc: "Técnicas diretas e instintivas para neutralizar agressões reais, agarramentos, empurrões e situações de perigo urbano. Aulas práticas com foco em autoconfiança feminina e masculina.",
    highlights: ["Sem Regras Esportivas", "Desvencilhamentos Rápidos", "Segurança e Autoconfiança", "Simulações de Cenários Reais"],
    target: "Qualquer Pessoa (Sem Exigência Prévia)",
    scheduleSummary: "Sábados (09h00 às 11h00)"
  }
];

const INSTRUCTORS_DATA = [
  {
    id: "carlos-silva",
    name: "Mestre Carlos Silva",
    role: "Head Coach de Muay Thai & Striking",
    cref: "Kru Formado & Faixa Preta",
    bio: "Mais de 16 anos dedicados ao ensino marcial de alto rendimento. Formador de campeões e especialista em metodologia de ensino para iniciantes e atletas.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    specialties: ["Muay Thai Tradicional", "Clinch & Cotovelos", "Kickboxing K-1"],
    achievements: [
      "Faixa Preta / Grau Superior Internacional",
      "Coordenador Técnico Geral do Centro de Treinamento",
      "Mais de 500 alunos e instrutores graduados",
      "Certificação em Fisiologia e Treinamento de Potência"
    ]
  },
  {
    id: "marcos-prado",
    name: "Prof. Marcos 'Gracie' Prado",
    role: "Head Coach de Jiu-Jitsu Brasileiro (BJJ)",
    cref: "Faixa Preta 2º Grau CBJJ/IBJJF",
    bio: "Especialista em passagens de guarda modernas, alavancas de finalização e defesa pessoal. Dedicado à pedagogia marcial inclusiva para crianças e adultos.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    specialties: ["Jiu-Jitsu Esportivo (Gi)", "No-Gi / Submission Grappling", "Defesa Pessoal"],
    achievements: [
      "Faixa Preta 2º Grau",
      "Campeão de múltiplos campeonatos estaduais e nacionais",
      "Mais de 12 anos de docência nos tatames"
    ]
  },
  {
    id: "ricardo-santos",
    name: "Coach Ricardo Santos",
    role: "Treinador Chefe de Boxe Clássico",
    cref: "Ex-Boxeador Profissional & Treinador",
    bio: "Especialista em biomecânica de golpes, esquivas milimétricas e resistência respiratória para combate.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    specialties: ["Boxe Clássico", "Padrão de Pêndulo e Fintas", "Manoplas de Alta Velocidade"],
    achievements: [
      "Cartel invicto como amador (18V - 0D)",
      "Treinador de atletas de destaque nos ringues",
      "Metodologia focada em queima de gordura e precisão"
    ]
  },
  {
    id: "anderson-costa",
    name: "Sensei Jin-Woo Park",
    role: "Mestre de Taekwondo Olímpico",
    cref: "Faixa Preta 4º Dan Kukkiwon",
    bio: "Dedicado ao desenvolvimento motor, flexibilidade e integridade moral das crianças e adultos através da arte marcial coreana.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    specialties: ["Taekwondo Olímpico", "Chutes Giratórios Acrobáticos", "Formação Infantil"],
    achievements: [
      "Faixa Preta 4º Dan Internacional",
      "15 anos de dedicação e arbitragem marcial",
      "Centenas de crianças formadas e disciplinadas"
    ]
  }
];

const FACILITIES_DATA = [
  {
    title: "Tatame Olímpico de Alta Densidade",
    desc: "Ampla área de tatame profissional com sistema anti-impacto que protege articulações em quedas e treinos intensos.",
    icon: "layers"
  },
  {
    title: "Octógono & Área de Grade Oficial",
    desc: "Grade e cage construídos nos padrões internacionais para prática real de transição e clinch no MMA.",
    icon: "shield"
  },
  {
    title: "Estação de Sacos Pesados & Manoplas",
    desc: "Sacos de couro de 60kg a 100kg, teto-solo, punching balls e manoplas tailandesas de primeira linha.",
    icon: "target"
  },
  {
    title: "Ambiente 100% Climatizado",
    desc: "Ar-condicionado central em todo o espaço de treino, garantindo conforto térmico e ventilação ideal durante treinos de alta intensidade.",
    icon: "wind"
  },
  {
    title: "Vestiários Premium com Duchas Quentes",
    desc: "Vestiários masculino e feminino com armários individuais, duchas pressurizadas e higiene impecável.",
    icon: "bath"
  },
  {
    title: "Lounge & Loja de Equipamentos",
    desc: "Espaço de convivência, hidratação e aquisição de luvas, bandagens, kimonos e artigos oficiais para treinos.",
    icon: "coffee"
  }
];

const SCHEDULE_DATA = [
  {
    day: "Segunda, Quarta e Sexta",
    periods: [
      { time: "07:00 - 08:00", modality: "Boxe Clássico", level: "Todos os Níveis", instructor: "Coach Ricardo Santos", shift: "manha" },
      { time: "16:00 - 17:00", modality: "Muay Thai (ADULTOS)", level: "Todos os Níveis", instructor: "Mestre Carlos Silva", shift: "tarde" },
      { time: "17:00 - 18:00", modality: "Judô Infantil & Juvenil", level: "Iniciante / Kids", instructor: "Prof. Marcos Prado", shift: "tarde" },
      { time: "18:00 - 19:00", modality: "Muay Thai (KIDS)", level: "Infantil", instructor: "Mestre Carlos Silva", shift: "noite" },
      { time: "19:00 - 20:00", modality: "Muay Thai (ADULTOS)", level: "Todos os Níveis", instructor: "Mestre Carlos Silva", shift: "noite" },
      { time: "20:00 - 21:30", modality: "Jiu-Jitsu / BJJ (Gi)", level: "Todos os Níveis", instructor: "Prof. Marcos Prado", shift: "noite" }
    ]
  },
  {
    day: "Terça e Quinta",
    periods: [
      { time: "08:00 - 09:00", modality: "Funcional Fight & Condicionamento", level: "Geral", instructor: "Mestre Carlos Silva", shift: "manha" },
      { time: "15:00 - 16:00", modality: "Muay Thai Técnico", level: "Todos os Níveis", instructor: "Mestre Carlos Silva", shift: "tarde" },
      { time: "17:00 - 18:00", modality: "Taekwondo Kids", level: "Infantil", instructor: "Sensei Jin-Woo Park", shift: "tarde" },
      { time: "18:00 - 19:00", modality: "Taekwondo Adulto", level: "Todos os Níveis", instructor: "Sensei Jin-Woo Park", shift: "noite" },
      { time: "19:00 - 20:00", modality: "Kickboxing & K-1", level: "Todos os Níveis", instructor: "Mestre Carlos Silva", shift: "noite" },
      { time: "20:00 - 21:30", modality: "MMA & Submission No-Gi", level: "Intermediário e Avançado", instructor: "Prof. Marcos Prado", shift: "noite" }
    ]
  },
  {
    day: "Sábado",
    periods: [
      { time: "08:00 - 09:00", modality: "Sparring Técnico Controlado", level: "Alunos Matriculados", instructor: "Mestre Carlos Silva", shift: "manha" },
      { time: "09:00 - 10:30", modality: "Defesa Pessoal & Krav Maga", level: "Todos os Níveis", instructor: "Equipe Técnica", shift: "manha" },
      { time: "10:30 - 12:00", modality: "Open Mat / Treino Livre BJJ", level: "Todos os Níveis", instructor: "Prof. Marcos Prado", shift: "manha" }
    ]
  }
];

const FAQ_DATA = [
  {
    question: "Nunca pratiquei artes marciais na vida. A academia é para mim?",
    answer: "Com certeza! Mais de 70% dos nossos novos alunos começam do zero absoluto. Nossas turmas são divididas por níveis técnicos, e os professores acompanham individualmente seus primeiros passos com respeito ao seu ritmo e segurança total."
  },
  {
    question: "Quais modalidades estão inclusas no Passaporte Livre?",
    answer: "No plano Passaporte Livre, você pode treinar TODAS as modalidades da grade: Muay Thai, Jiu-Jitsu (Gi e No-Gi), Boxe Clássico, MMA, Kickboxing, Taekwondo, Judô e Defesa Pessoal, em qualquer horário e turno."
  },
  {
    question: "Preciso ter equipamentos (luvas, kimono, caneleira) na primeira aula?",
    answer: "Não! Para a sua aula experimental, basta vir com uma roupa esportiva confortável (bermuda e camiseta). Nós emprestamos luvas higienizadas e fornecemos toda a orientação."
  },
  {
    question: "Como funciona o agendamento da Aula Experimental Gratuita?",
    answer: "Basta clicar em qualquer botão de 'Agendar Aula Gratuita' no site, selecionar a modalidade do seu interesse e o turno de preferência. Você será direcionado para o WhatsApp da recepção para confirmar o melhor dia e horário."
  },
  {
    question: "A academia aceita planos corporativos como Wellhub (Gympass) ou TotalPass?",
    answer: "Sim! Aceitamos os principais planos corporativos com validação de check-in diário no balcão de atendimento para todas as artes marciais."
  },
  {
    question: "Mulheres e crianças podem treinar com segurança?",
    answer: "Absolutamente! Nossas turmas contam com alta participação feminina e turmas kids exclusivas com pedagogia marcial baseada em disciplina, respeito mútuo e zero violência."
  }
];

window.COMBAT_DATA = {
  modalities: COMBAT_MODALITIES,
  schedules: SCHEDULE_DATA,
  instructors: INSTRUCTORS_DATA,
  facilities: FACILITIES_DATA,
  faq: FAQ_DATA
};
window.BORU_DATA = window.COMBAT_DATA;
