# 🥊 Borü Centro de Combate

> Plataforma completa de gestão acadêmica, portal do aluno e experiência interativa para academias de artes marciais (Muay Thai, Boxe e Jiu-Jitsu), idealizada para o mestre **Felipe Borü**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4-lightgrey?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5-black?logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-orange?logo=google)

---

## 📌 Sumário
- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Configuração de Variáveis de Ambiente](#-configuração-de-variáveis-de-ambiente)
- [Próximos Passos (Roadmap)](#-próximos-passos-roadmap)

---

## 🥋 Visão Geral

O **Borü Centro de Combate** foi desenvolvido para unir uma presença online moderna (Landing Page de alta conversão) com um ecossistema completo de gestão de alunos e treino:
- **Alunos** acompanham sua evolução real por Prajied (cordão de Muay Thai), histórico de presença, situação financeira e tiram dúvidas com uma IA treinada para artes marciais.
- **Professores e Gestores** têm controle centralizado de matrículas, graduações, renovação de mensalidades e cobrança facilitada via WhatsApp com 1 clique.

---

## ✨ Funcionalidades Principais

### 🌐 1. Landing Page Institucional
- Design escuro agressivo e imersivo voltado para o universo da luta.
- Demonstração de modalidades, metodologia e perfil do instrutor.
- Planos e agendamento de aula experimental interativo.

### 👤 2. Portal do Aluno
- **Autenticação:** Acesso por CPF e senha com fluxo para primeiro acesso.
- **Recuperação de Senha ("Esqueci a Senha"):** Recuperação simples via CPF com senha provisória e redefinição obrigatória.
- **Graduação Oficial de Muay Thai (Prajied):** Sistema dinâmico com identificação visual por cores (Branco, Ponta Vermelha, Vermelho, etc.), atualizado pelo professor.
- **Sensei IA (Google Gemini):** Chatbot inteligente com IA para orientações sobre treinos, regras e preparação física. (Não disponível por Enquanto)
- **Check-in & Histórico de Treinos:** Registro e acompanhamento de frequência nas aulas.
- **Módulo Financeiro:** Visualização de vencimento da mensalidade e checkout com suporte a Cartão de Crédito e PIX.

### 🛡️ 3. Painel Administrativo (Professor & Recepção)
- **Gestão de Alunos:** Listagem rápida com status de pagamento e nível.
- **Graduação em Tempo Real:** Seletor de Prajied que salva imediatamente no banco de dados.
- **Controle de Mensalidades:** Botão de confirmação de pagamento com extensão automática de +30 dias de vigência.
- **Cobrança Expressa via WhatsApp:** Mensagem pré-formatada com link direto para o WhatsApp do aluno.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** com **Vite** e **TypeScript**
- **Tailwind CSS** para estilização utilitária e responsiva
- **Lucide Icons** para iconografia
- **React Router DOM** para navegação SPA

### Backend
- **Node.js** com **Express** e **TypeScript** (`tsx`)
- **Prisma ORM** com **SQLite** para persistência leve e ágil
- **Google GenAI SDK (`@google/genai`)** para integração com modelos Gemini

---

## 📂 Estrutura do Projeto

```text
boru/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Definição do banco e modelos
│   │   ├── dev.db              # Banco SQLite local
│   │   └── seed.ts             # Dados iniciais de teste
│   ├── src/
│   │   └── server.ts           # Servidor Express e rotas da API
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── PortalAluno.tsx    # Portal completo do aluno
│   │   │   ├── AdminDashboard.tsx # Painel do professor
│   │   │   ├── Checkout.tsx       # Checkout de mensalidades
│   │   │   └── AgendarAula.tsx    # Agendamento de aula experimental
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html              # Landing page principal
│   ├── package.json
│   └── vite.config.ts
├── iniciar_sistema.bat         # Script para rodar tudo com 2 cliques
└── README.md
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Git instalado

### Modo Rápido (Windows)
Basta dar dois cliques no arquivo:
```cmd
iniciar_sistema.bat
```
Ele iniciará tanto a API (porta `3001`) quanto a interface web (porta `5173`) automaticamente.

### Modo Manual

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Bergamin1234/boru.git
   cd boru
   ```

2. **Backend:**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm run dev
   ```
   *A API estará rodando em `http://localhost:3001`.*

3. **Frontend (em outro terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *O site estará disponível em `http://localhost:5173`.*

---

## 🔐 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend/`:

```env
PORT=3001
DATABASE_URL="file:./dev.db"
GEMINI_API_KEY="sua_chave_da_google_gemini_aqui"
```

---

## 🗺️ Próximos Passos (Roadmap)

- [ ] Integração de gateway real de pagamento (Mercado Pago / Asaas / Stripe).
- [ ] Notificações automáticas por WhatsApp e E-mail para avisos de treino e cobrança.
- [ ] Aplicativo Mobile (PWA ou React Native) para check-in por QR Code na entrada da academia.
- [ ] Deploy em produção (Vercel para frontend e Render/Railway para backend).

---

## 👨‍💻 Autor & Manutenção

Desenvolvido para **Borü Centro de Combate**.  
Instrutor Responsável: **Felipe Borü**.
