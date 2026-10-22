# Borü Centro de Combate

Plataforma web para apresentação do CT Borü e gestão de alunos, aulas, frequência, mensalidades e aulas experimentais. O projeto reúne uma landing page, um portal do aluno e um painel administrativo.

> **Estado do projeto:** alguns fluxos são demonstrações locais. Pagamentos não passam por um gateway real, a autenticação administrativa não protege a API e a integração com Gemini ainda não está implementada. Consulte [Limitações e segurança](#limitações-e-segurança) antes de publicar o sistema.

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

## Funcionalidades

- **Landing page:** apresentação do CT, modalidades, professores, planos, horários, perguntas frequentes e localização.
- **Portal do aluno:** login por CPF e senha, troca de senha, consulta de aulas, check-in, calendário de frequência, graduação (*prajied*) e renovação de mensalidade.
- **Painel administrativo:** cadastro de alunos, atualização de graduação, controle de pagamentos e presenças, calendário individual e acompanhamento de leads de aulas experimentais.
- **Aulas experimentais:** formulário de agendamento e acompanhamento do lead até a conversão ou desistência.
- **Checkout:** cadastro de aluno e registro simulado de pagamento por plano.

## Tecnologias

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
```

O frontend é servido pelo Vite durante o desenvolvimento. A landing page usa HTML e JavaScript próprios, enquanto as telas do portal, painel, checkout e agendamento são rotas React. O backend expõe a API REST e persiste os dados no SQLite.

## Modelo de dados

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

- Integrar um gateway de pagamento real, como Mercado Pago ou Asaas.
- Implementar autenticação e autorização seguras para alunos e administradores.
- Integrar notificações de cobrança e confirmação de aulas.
- Conectar a funcionalidade de IA, se desejada.
- Preparar deploy, monitoramento e backups do banco.

## Manutenção

Projeto desenvolvido para o **Borü Centro de Combate**, sob responsabilidade do instrutor **Felipe Borü**.
