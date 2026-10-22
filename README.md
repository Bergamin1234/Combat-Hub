# 🥊 Borü Centro de Combate

> Plataforma completa de gestão acadêmica, portal do aluno gamificado e experiência interativa para academias de artes marciais (Muay Thai, Boxe e Jiu-Jitsu), idealizada para o mestre **Felipe Borü**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4-lightgrey?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5-black?logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

---

## 📌 Sumário
- [Divisão de Perfis & Acessos](#-divisão-de-perfis--acessos)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Estímulo ao Check-in & Gamificação](#-estímulo-ao-check-in--gamificação)
- [Controle de Frequência, Faltas e Doenças](#-controle-de-frequência-faltas-e-doenças)
- [Mercado & Loja Borü (Versão Beta)](#-mercado--loja-borü-versão-beta)
- [Mural de Avisos da Academia](#-mural-de-avisos-da-academia)
- [Pagamentos Exclusivamente Presenciais](#-pagamentos-exclusivamente-presenciais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Executar o Projeto](#-como-executar-o-projeto)

---

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

---

## ✨ Funcionalidades Principais

### 👤 1. Portal do Aluno (Mobile-First & Desktop)
- **Barra de Navegação Inferior (Mobile):** Acesso rápido aos módulos principais (Treinos, Presença, Mural, Loja e Plano) com 1 toque no celular.
- **Autenticação Segura & Recuperação de Senha:** Login com CPF e recuperação via CPF/E-mail/Telefone com credencial provisória.
- **Graduação Oficial de Muay Thai (Prajied):** Identificação visual por cores de Prajied reconhecidas pelo Mestre Felipe Borü.

### 🔥 2. Estímulo ao Check-in & Gamificação
- **Sequência de Treinos (Streak):** Contador do *Fogo do Guerreiro* 🔥 que contabiliza treinos e semanas consecutivas para incentivar a disciplina.
- **Meta Mensal de Treinos:** Barra de progresso interativa mostrando a meta do plano (ex: 8, 12 ou 20 treinos/mês).
- **Medalhas Marciais (Badges):** Conquistas desbloqueáveis (*Primeiro Sangue*, *Guerreiro Focado*, *Inabalável*, *Casca Grossa*).
- **Justificativa de Ausência / Doença:** O aluno pode avisar antecipadamente pelo app caso esteja doente ou com atestado médico, evitando falta não justificada.

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

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, React Router DOM.
- **Backend:** Node.js, Express, TypeScript (`tsx`), Prisma ORM.
- **Banco de Dados:** SQLite (`dev.db`).

---

## 🚀 Como Executar o Projeto

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

---

## 🔑 Credenciais Pré-configuradas (Acesso Rápido)

- **Administrador Master:** `admin@boru.com` / `admin123`
- **Professor Chefe:** `felipe@boru.com` / `boru123`
- **Aluno (Exemplo):** CPF `000.000.000-00` (Senha temporária padrão: `boru123`)
