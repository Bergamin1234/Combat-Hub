// frontend/src/config/academyConfig.ts
// Configurações Globais da Academia / Centro de Treinamento (White-Label Model)

export interface AcademyConfig {
  nome: string;
  nomeCurto: string;
  subtitulo: string;
  slogan: string;
  descricao: string;
  sigla: string;
  badge: string;
  
  // Localização & Contatos
  cidadeEstado: string;
  enderecoCompleto: string;
  telefoneFormatado: string;
  whatsappNumero: string; // apenas dígitos com DDI, ex: 5511999999999
  emailContato: string;
  instagramHandle: string;
  instagramUrl: string;

  // Financeiro & PIX
  chavePix: string;
  beneficiarioPix: string;

  // Horários de Atendimento
  horarioSemana: string;
  horarioFimDeSemana: string;

  // GPS & Mapas
  coordenadasTexto: string;
  mapsEmbedUrl: string;
  mapsGpsLink: string;

  // Imagens & Visual
  logoUrl: string;
  faviconUrl: string;
  wallpaperUrl: string;

  // Coordenação Técnica / Head Coach Padrão
  headCoach: {
    nome: string;
    cargo: string;
    graduacao: string;
    bio: string;
  };
}

export const ACADEMY_CONFIG: AcademyConfig = {
  nome: 'COMBAT HUB',
  nomeCurto: 'COMBAT HUB',
  subtitulo: 'Centro de Treinamento em Artes Marciais & Alta Performance',
  slogan: 'Disciplina, Técnica & Evolução Constante',
  descricao: 'Sistema e plataforma completa para academias de lutas, centros de combate e dojos. Gestão de alunos, chamadas, graduações, planos e loja integrada.',
  sigla: 'CH',
  badge: 'CT MODELO',

  cidadeEstado: 'São Paulo - SP',
  enderecoCompleto: 'Av. das Artes Marciais, 1500 - Centro',
  telefoneFormatado: '(11) 98765-4321',
  whatsappNumero: '5511987654321',
  emailContato: 'contato@academiadecombate.com',
  instagramHandle: '@academiadecombate',
  instagramUrl: 'https://instagram.com',

  chavePix: 'pix@academiadecombate.com',
  beneficiarioPix: 'Centro de Treinamento em Artes Marciais',

  horarioSemana: 'Segunda a Sexta: 06h às 22h',
  horarioFimDeSemana: 'Sábados: 08h às 14h',

  coordenadasTexto: '-23.550520, -46.633308',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=-23.550520,-46.633308&hl=pt-BR&z=17&output=embed',
  mapsGpsLink: 'https://maps.google.com/?q=-23.550520,-46.633308',

  logoUrl: '/logo-combat.svg',
  faviconUrl: '/favicon.svg',
  wallpaperUrl: '/wallpaper-combat.svg',

  headCoach: {
    nome: 'Mestre Carlos Silva',
    cargo: 'Coordenador Técnico & Head Coach',
    graduacao: 'Faixa Preta / Grau Superior',
    bio: 'Mais de 15 anos dedicados à formação de atletas e praticantes, unindo respeito, tradição marcial e métodos científicos de condicionamento físico.'
  }
};
