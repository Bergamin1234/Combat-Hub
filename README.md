<div align="center">
  <img src="frontend/public/logo-combat.svg" alt="Combat Hub - Sistema Modelo para Academias" width="120" />
  <h1>COMBAT HUB</h1>
  <p><strong>Sistema Modelo White-Label para Centros de Treinamento e Academias de Luta</strong></p>
  <p>Plataforma Integrada de Gestão Marcial, Frequência em Tempo Real, Portal do Aluno & Presença Digital</p>

  <p>
    <img src="https://img.shields.io/badge/React-18-blue?logo=react&style=flat-square" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square" alt="TypeScript" />
    <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white&style=flat-square" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white&style=flat-square" alt="Express" />
    <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white&style=flat-square" alt="Prisma ORM" />
    <img src="https://img.shields.io/badge/White--Label-Ready-red?style=flat-square" alt="White-Label Ready" />
  </p>
</div>

---

## 📌 Sobre o Modelo

O **Combat Hub** é uma solução completa, modular e pronta para implantação (*white-label*) desenvolvida especificamente para **Centros de Treinamento, Dojos e Academias de Artes Marciais** (Muay Thai, Jiu-Jitsu, Boxe, MMA, Taekwondo, Judô, Kickboxing e Karatê).

Projetado para ser adotado por qualquer academia com personalização rápida em um único arquivo de configuração, o sistema combina:
1. **Landing Page Institucional de Alta Conversão:** Captação de novos alunos com agendamento de aulas experimentais.
2. **Portal do Aluno (Mobile-First):** Experiência nativa no celular com check-in, gamificação por streaks, acompanhamento de graduação e mural.
3. **Painel de Gestão para Administrador e Professores:** Chamada rápida na borda do tatame, calendário mensal de frequência, controle de retenção/evasão, gestão de planos e estoque de produtos.

---

## ⚙️ Personalização Centralizada (White-Label)

A identidade visual e as informações de contato da academia podem ser configuradas em segundos nos arquivos de configuração:

* **TypeScript (React SPA):** `frontend/src/config/academyConfig.ts`
* **Navegador (Landing Page Estática):** `frontend/public/academyConfig.js`

```typescript
export const ACADEMY_CONFIG = {
  nome: 'COMBAT HUB',
  subtitulo: 'Centro de Treinamento de Artes Marciais',
  telefone: '(11) 98765-4321',
  whatsappNumero: '5511987654321',
  enderecoCompleto: 'Av. das Artes Marciais, 1500 - Centro',
  cidade: 'São Paulo - SP',
  chavePix: 'contato@academiadecombate.com.br',
  instagram: '@academiadecombate',
  logoUrl: '/logo-combat.svg',
  faviconUrl: '/favicon.svg',
  wallpaperUrl: '/wallpaper-combat.svg',
  // ...
};
```

Qualquer alteração neste arquivo atualiza automaticamente:
* Nome exibido nos cabeçalhos, títulos, rodapé e metadados SEO.
* Números e links automáticos de mensagens no WhatsApp.
* Chave PIX e dados bancários para acerto presencial ou online.
* Endereço físico e links do Google Maps.

---

## 🌟 Módulos da Plataforma

### 🥊 1. Landing Page Institucional
* **Apresentação Oficial:** Filosofia de treino, infraestrutura e corpo docente qualificado.
* **Grade de Modalidades:** Apresentação dinâmica de Muay Thai, Boxe, Jiu-Jitsu, MMA e Taekwondo.
* **Agendamento de Aula Experimental:** Funil direto de captura de interessados integrado com WhatsApp e painel administrativo.
* **Galeria Imersiva:** Apresentação visual da atmosfera e dos treinos.
* **Localização e Contato:** Endereço, mapa interativo e botão direto de contato.

### 👤 2. Portal do Aluno (Mobile-First)
* **Interface Otimizada para Celular:** Menu de navegação inferior (*bottom bar*) no padrão de aplicativo móvel.
* **Check-in Inteligente:** Validação de presenças e acompanhamento dos treinos agendados na semana.
* **Gamificação (Streak do Guerreiro):** Contador de semanas consecutivas treinadas com medalhas desbloqueáveis de constância (*Primeiro Sangue*, *Guerreiro Focado*, *Inabalável*, *Casca Grossa*).
* **Graduação Oficial:** Visualização das graduações (Prajieds no Muay Thai, Faixas no Jiu-Jitsu/Taekwondo).
* **Mural de Avisos:** Comunicados oficiais da coordenação sobre exames, seminários e eventos.
* **Justificativa de Ausência:** Registro preventivo de atestados médicos ou compromissos para não impactar a frequência.
* **Loja & Vitrine de Produtos:** Catálogo de equipamentos oficiais (luvas, caneleiras, bandagens, protetores) para reserva no balcão.

### 👑 3. Painel Administrativo & Gestão Docente
* **Chamada Rápida em 1 Clique:** O professor ou administrador confirma presenças diretamente do celular na borda do tatame.
* **Calendário Macro de Frequência:** Mapa mensal da academia com status individual de presentes, faltas e atestados médicos.
* **Prevenção de Evasão:** Identificação automática de atletas com baixa assiduidade (&lt; 50%) com botão de mensagem de acolhimento via WhatsApp em 1 clique.
* **Gestão de Planos & Passes:**
  * Planos mensais (2x/semana, 3x/semana, Todos os horários).
  * Convênios e passes corporativos (Wellhub / Gympass, TotalPass e Diárias avulsas).
* **Gestão de Equipe:** Cadastro de professores com permissões de lançamento de chamadas e controle por modalidade.
* **Gestão de Estoque:** Cadastro de produtos físicos da recepção com controle de quantidade e valores.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias Utilizadas |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Axios |
| **Backend** | Node.js, Express, TypeScript, RESTful API |
| **Banco de Dados & ORM** | SQLite, Prisma ORM 5 |
| **Arquitetura** | Monorepo modularizado com separação clara de responsabilidades |

---

## 📁 Estrutura do Repositório

```text
boru-privado/
├── backend/
│   ├── prisma/
│   │   ├── dev.db              # Banco de dados local SQLite
│   │   ├── schema.prisma       # Modelagem relacional do banco de dados
│   │   └── seed.ts             # Dados modelo pré-carregados (usuários, aulas, avisos, produtos)
│   ├── src/
│   │   └── server.ts           # Servidor HTTP Express com rotas REST e controle de acesso
│   └── package.json
├── frontend/
│   ├── public/                 # Ativos estáticos, logos, favicon e academyConfig.js
│   ├── src/
│   │   ├── components/         # Componentes compartilhados (Mural de Avisos, etc.)
│   │   ├── config/             # academyConfig.ts com dados customizáveis da academia
│   │   ├── pages/              # Landing Page, Agendar Aula, Checkout, Portal do Aluno e Painel Admin
│   │   ├── services/           # Camada de comunicação com a API REST
│   │   └── App.tsx             # Roteador central da aplicação
│   └── package.json
└── package.json                # Scripts globais de orquestração do monorepo
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* **Node.js** 18 ou superior instalado.
* **npm** ou **yarn**.

### Passo a Passo

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicialize o banco de dados e execute o seed com os dados modelo:
   ```bash
   cd backend
   npx prisma db push
   npx prisma db seed
   cd ..
   ```

3. Inicie os servidores de desenvolvimento:
   ```bash
   npm run dev
   ```

* **Frontend:** `http://localhost:5173`
* **API Backend:** `http://localhost:3001`

---

## 🔐 Acesso e Credenciais Modelo

* **Painel Administrativo:** `/admin`
* **Portal do Aluno:** `/aluno`
* **Credenciais do Administrador Master:**
  * Login: `BrgAdmin` (ou `admin@academia.com`)
  * Senha: `CentroDeCombateModelTotallity984490@!`
* **Credenciais dos Professores Modelo:**
  * Login: CPF do professor (ex: `12345678900`)
  * Senha padrão inicial: `senha123`

---

## 📄 Licença

Este projeto é disponibilizado sob modelo proprietário para implantação e customização em centros de treinamento e academias parceiras.
