# Borü Centro de Combate
Plataforma web para apresentação do CT Borü e gestão de alunos, aulas, frequência, mensalidades e aulas experimentais. O projeto reúne uma landing page, um portal do aluno e um painel administrativo.
> **Estado do projeto:** alguns fluxos são demonstrações locais. Pagamentos não passam por um gateway real, a autenticação administrativa não protege a API e a integração com Gemini ainda não está implementada. Consulte [Limitações e segurança](#limitações-e-segurança) antes de publicar o sistema.
> Plataforma completa de gestão acadêmica, portal do aluno gamificado e experiência interativa para academias de artes marciais (Muay Thai, Boxe e Jiu-Jitsu), idealizada para o mestre **Felipe Borü**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4-lightgrey?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5-black?logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## Sumário


- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura e estrutura](#arquitetura-e-estrutura)
- [Modelo de dados](#modelo-de-dados)
- [Regras de negócio](#regras-de-negócio)
- [Como executar](#como-executar)
- [API](#api)
- [Limitações e segurança](#limitações-e-segurança)
- [Próximos passos](#próximos-passos)
- [Divisão de Perfis & Acessos](#-divisão-de-perfis--acessos)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Estímulo ao Check-in & Gamificação](#-estímulo-ao-check-in--gamificação)
- [Controle de Frequência, Faltas e Doenças](#-controle-de-frequência-faltas-e-doenças)
- [Mercado & Loja Borü (Versão Beta)](#-mercado--loja-borü-versão-beta)
- [Mural de Avisos da Academia](#-mural-de-avisos-da-academia)
- [Pagamentos Exclusivamente Presenciais](#-pagamentos-exclusivamente-presenciais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Executar o Projeto](#-como-executar-o-projeto)

## Funcionalidades

- **Landing page:** apresentação do CT, modalidades, professores, planos, horários, perguntas frequentes e localização.
- **Portal do aluno:** login por CPF e senha, troca de senha, consulta de aulas, check-in, calendário de frequência, graduação (*prajied*) e renovação de mensalidade.
- **Painel administrativo:** cadastro de alunos, atualização de graduação, controle de pagamentos e presenças, calendário individual e acompanhamento de leads de aulas experimentais.
- **Aulas experimentais:** formulário de agendamento e acompanhamento do lead até a conversão ou desistência.
- **Checkout:** cadastro de aluno e registro simulado de pagamento por plano.
- 
## 👥 Divisão de Perfis & Acessos

O sistema possui controle de acesso baseado em funções (RBAC) com distinção clara de responsabilidades:

1. **👑 Administrador Geral:**
   - Acesso irrestrito a todos os módulos do sistema.
   - **Função exclusiva de cadastrar, gerenciar e remover novos Professores e instrutores**.
   - Gestão de matrículas, pagamentos presenciais, relatórios de inadimplência e estoque da loja.

2. **🥋 Professor / Instrutor (Ex: Felipe Borü):**
   - Acesso ao painel operacional do dojo.
   - Atualização da graduação de **Prajied** dos alunos.
   - Lançamento de chamadas e controle de presença/falta/doença.
   - Publicação de comunicados e recados oficiais no **Mural de Avisos**.
   - *(A aba de criação e exclusão de novos professores é restrita e oculta para este perfil)*.

3. **👤 Aluno:**
   - Acesso ao **Portal do Aluno** otimizado para celulares (com barra de navegação inferior estilo app nativo) e computadores.
   - Check-in de treinos, histórico com porcentagens de presença, mural de avisos e vitrine da loja física.

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, React Router, Axios, Tailwind CSS e Lucide |
| Backend | Node.js, Express, TypeScript executado com `tsx` e CORS |
| Persistência | SQLite e Prisma ORM |
| IA | `@google/genai` está listado como dependência, mas não há integração ativa no servidor |

## Arquitetura e estrutura

```text
boru/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Modelos e configuração do SQLite
│   │   ├── seed.ts              # Dados de demonstração
│   │   └── dev.db               # Banco local
│   ├── src/server.ts            # API Express e rotas
│   ├── add-routes.cjs           # Utilitário de edição do servidor
│   └── package.json
├── frontend/
│   ├── index.html               # Landing page
│   ├── public/                  # Scripts e dados usados pela landing page
│   ├── src/
│   │   ├── App.tsx              # Rotas da aplicação
│   │   └── pages/               # Portal, painel, checkout e agendamento
│   └── package.json
├── iniciar_sistema.bat          # Inicializa backend e frontend no Windows
└── package.json                 # Workspaces e comandos da raiz
``

O frontend é servido pelo Vite durante o desenvolvimento. A landing page usa HTML e JavaScript próprios, enquanto as telas do portal, painel, checkout e agendamento são rotas React. O backend expõe a API REST e persiste os dados no SQLite.

## Modelo de dados
### 👤 1. Portal do Aluno (Mobile-First & Desktop)
- **Barra de Navegação Inferior (Mobile):** Acesso rápido aos módulos principais (Treinos, Presença, Mural, Loja e Plano) com 1 toque no celular.
- **Autenticação Segura & Recuperação de Senha:** Login com CPF e recuperação via CPF/E-mail/Telefone com credencial provisória.
- **Graduação Oficial de Muay Thai (Prajied):** Identificação visual por cores de Prajied reconhecidas pelo Mestre Felipe Borü.

### 🔥 2. Estímulo ao Check-in & Gamificação
- **Sequência de Treinos (Streak):** Contador do *Fogo do Guerreiro* 🔥 que contabiliza treinos e semanas consecutivas para incentivar a disciplina.
- **Meta Mensal de Treinos:** Barra de progresso interativa mostrando a meta do plano (ex: 8, 12 ou 20 treinos/mês).
- **Medalhas Marciais (Badges):** Conquistas desbloqueáveis (*Primeiro Sangue*, *Guerreiro Focado*, *Inabalável*, *Casca Grossa*).
- **Justificativa de Ausência / Doença:** O aluno pode avisar antecipadamente pelo app caso esteja doente ou com atestado médico, evitando falta não justificada.
- 
### 👤 2. Portal do Aluno
- **Autenticação:** Acesso por CPF e senha com fluxo para primeiro acesso.
- **Recuperação de Senha ("Esqueci a Senha"):** Recuperação simples via CPF com senha provisória e redefinição obrigatória.
- **Graduação Oficial de Muay Thai (Prajied):** Sistema dinâmico com identificação visual por cores (Branco, Ponta Vermelha, Vermelho, etc.), atualizado pelo professor.
- **Sensei IA (Google Gemini):** Chatbot inteligente com IA para orientações sobre treinos, regras e preparação física. (Não disponível por Enquanto)
- **Check-in & Histórico de Treinos:** Registro e acompanhamento de frequência nas aulas.
- **Módulo Financeiro:** Visualização de vencimento da mensalidade e checkout com suporte a Cartão de Crédito e PIX.

### 📊 3. Controle de Frequência, Faltas e Doenças
O banco de dados armazena registros categorizados de frequência e calcula automaticamente:
- 🟢 **% Presença Real:** Treinos realizados fisicamente no tatame.
- 🔵 **% Ausência por Doença:** Aulas não frequentadas por motivo de saúde devidamente justificadas/abonadas.
- 🔴 **% Falta Comum:** Ausências sem justificativa prévia.
- ⭐ **% Frequência Efetiva:** Base de cálculo ponderada para liberação de exame de graduação de Prajied.

### 🛍️ 4. Mercado & Loja Borü (Versão Beta)
Módulo completo de catálogo físico de equipamentos e suprimentos esportivos com suporte no backend e abas de categorias:
- **Protetor Bucal** (Gel termomoldável, Duplo para sparring)
- **Luvas** (12oz, 14oz, 16oz em couro sintético de alta densidade)
- **Caneleiras** (Anatômicas com proteção de peito de pé)
- **Bandagens** (4m e 5m em algodão e elastano)
- **Alimentos & Bebidas** (Barrinhas de Whey, Paçocas proteicas, Energéticos, Água)
- *Para os alunos, o módulo avisa que a compra é presencial na recepção da academia, com botão de reserva direta no balcão.*

### 📢 5. Mural de Avisos da Academia
- Professores e Administradores podem publicar comunicados oficiais categorizados (`URGENTE`, `GRADUAÇÃO`, `EVENTO`, `GERAL`) e fixar avisos no topo.
- Os avisos são atualizados em tempo real na aba dedicada do Portal do Aluno.

### 💵 6. Pagamentos Exclusivamente Presenciais
- Removido qualquer formulário de cartão de crédito ou simulação online.
- As mensalidades e diárias são acertadas **presencialmente no balcão da academia** (PIX no balcão, Cartão de Débito/Crédito na maquininha ou Dinheiro).
- Alunos visualizam data de vencimento e status (PAGO / PENDENTE / ATRASADO).
- O professor/administrador confirma o pagamento na recepção com 1 clique (`Pago (+30d)`), renovando a vigência automaticamente.

Os modelos estão definidos em [`backend/prisma/schema.prisma`](./backend/prisma/schema.prisma):

- **`Aluno`:** dados de contato, CPF, credenciais, plano e graduação. CPF e e-mail são únicos quando informados.
- **`Mensalidade`:** valor, vencimento, pagamento e status; pertence a um aluno. Um aluno pode ter várias mensalidades.
- **`EventoDeAula`:** título e horário de uma aula; pode agrupar vários registros de presença.
- **`AgendamentoPresenca`:** relaciona um aluno a uma aula (opcional) e registra data, status e justificativa.
- **`AgendamentoExperimental`:** contato e horário do lead, observações e andamento da aula experimental.

Relações principais: aluno–mensalidade (1:N), aluno–presença (1:N) e evento–agendamento de presença (1:N). A conversão de um lead cria um aluno e mantém o registro original do agendamento.

## Regras de negócio

### Alunos e acesso
- O CPF é armazenado sem máscara e usado no login.
- Alunos criados pelo painel ou convertidos de um lead recebem uma senha temporária e precisam alterá-la no primeiro acesso.
- O checkout cria o aluno com a senha escolhida e registra a primeira mensalidade como paga.

### Mensalidades
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, React Router DOM.
- **Backend:** Node.js, Express, TypeScript (`tsx`), Prisma ORM.
- **Banco de Dados:** SQLite (`dev.db`).
- Os status usados são `PENDENTE`, `PAGO` e `ATRASADO`.
- O painel considera a mensalidade mais recente para mostrar a situação do aluno.
- Os fluxos de pagamento atuais registram a mensalidade como paga e definem o vencimento para 30 dias a partir da data do pagamento. Essa confirmação é simulada; não há validação por uma instituição financeira.

### Presença e frequência
- O check-in do aluno começa como `AGENDADO` e precisa ser validado pelo professor.
- Os status são `AGENDADO`, `PRESENTE`, `JUSTIFICADO` e `AUSENTE`.
- A frequência mensal considera `PRESENTE` e `JUSTIFICADO` como presenças efetivas.
- A meta é calculada com quatro semanas: plano 2x/semana = 8 aulas; 3x/semana = 12; “Todos os Horários” = 20; “Diária” = 4.

### Aulas experimentais
- Um novo agendamento começa como `PENDENTE`.
- Após a aula, pode passar para `REALIZADA`; o painel ordena os leads pós-aula mais antigos primeiro para apoiar o acompanhamento.
- Os status finais são `FECHOU_CONTRATO` e `DESISTIU`. Ao converter, o sistema cria o aluno e a primeira mensalidade pendente.

## Como executar

### Pré-requisitos
- Node.js 18 ou superior e npm.
- Git, caso vá clonar o repositório.

### Instalação e desenvolvimento
Na raiz do repositório:

```bash
npm install
npm run db:generate -w backend
npm run db:push -w backend
npm run dev
```

O comando `npm run dev` inicia backend e frontend. A API fica em `http://localhost:3001` (ou na porta definida por `PORT`) e o frontend em `http://localhost:5173`.

Também é possível iniciar cada serviço em um terminal separado:

```bash
npm run dev:backend
npm run dev:frontend
```

No Windows, [`iniciar_sistema.bat`](./iniciar_sistema.bat) inicia os dois serviços após a instalação das dependências.

### Dados de demonstração

Para popular o banco:

```bash
cd backend
npx prisma db seed
```

> **Atenção:** o seed apaga os registros existentes antes de criar os dados de demonstração. Não o execute em um banco com dados que deseja preservar.

### Banco de dados
O schema configura SQLite em `backend/prisma/dev.db`. Para sincronizar o schema após alterações, execute `npm run db:push -w backend`. O backend também aceita a variável `PORT`; por padrão, usa a porta `3001`.

## API
Rotas implementadas em [`backend/src/server.ts`](./backend/src/server.ts):

| Grupo | Rotas principais | Uso |
| --- | --- | --- |
| Alunos | `POST /api/alunos/login`, `POST /api/alunos/recuperar-senha`, `POST /api/alunos/alterar-senha` | Acesso e manutenção da senha |
| Aulas e presença | `GET /api/aulas`, `POST /api/checkin` | Consulta de aulas e check-in |
| Administração | `/api/admin/alunos`, `/api/admin/presencas`, `/api/admin/dashboard` | Gestão de alunos, presença e indicadores |
| Frequência | `GET /api/admin/alunos/:id/calendario` | Calendário e estatísticas de um aluno |
| Aulas experimentais | `POST /api/agendamentos`, `/api/admin/agendamentos` | Agendamento e acompanhamento de leads |
| Checkout e pagamentos | `POST /api/checkout`, `POST /api/pagamentos/processar` | Cadastro e simulação do pagamento |

As rotas administrativas não possuem autenticação no servidor atualmente. A senha exibida na tela do painel é apenas uma barreira visual no frontend e não deve ser considerada controle de acesso.

## Limitações e segurança
Este projeto ainda não está pronto para uso em produção:

- A senha administrativa (`admin123`) está fixa no frontend, e as rotas de administração da API não exigem autenticação.
- As senhas dos alunos são comparadas e persistidas diretamente, sem hash.
- A recuperação de senha redefine a senha para um valor fixo (`boru123`) e o informa na resposta da API.
- O processamento de pagamento é um mock: não há integração nem confirmação com gateway.
- O SDK do Gemini está instalado, mas o chatbot ainda não está conectado ao backend.
- A aplicação usa SQLite local e não inclui configuração de deploy ou estratégia de backup.

Antes de disponibilizar o sistema publicamente, implemente autenticação e autorização no backend, armazenamento seguro de senhas, recuperação de senha por canal verificado, integração real de pagamento e configuração de produção.

## Próximos passos

### Modo Rápido (Windows)
Execute o arquivo:
```cmd
iniciar_sistema.bat
```

### Modo Manual
1. **Backend:**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npx prisma db seed
   npm run dev
   ```
   *Servidor rodando em: `http://localhost:3001`*

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Aplicação disponível em: `http://localhost:5173`*
   

- Integrar um gateway de pagamento real, como Mercado Pago ou Asaas.
- Implementar autenticação e autorização seguras para alunos e administradores.
- Integrar notificações de cobrança e confirmação de aulas.
- Conectar a funcionalidade de IA, se desejada.
- Preparar deploy, monitoramento e backups do banco.

## Manutenção
Projeto desenvolvido para o **Borü Centro de Combate**, sob responsabilidade do instrutor **Felipe Borü**.

## 🔑 Credenciais Pré-configuradas (Acesso Rápido)

- **Administrador Master:** `admin@boru.com` / `admin123`
- **Professor Chefe:** `felipe@boru.com` / `boru123`
- **Aluno (Exemplo):** CPF `000.000.000-00` (Senha temporária padrão: `boru123`)

