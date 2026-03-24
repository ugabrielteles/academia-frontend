# Academia Frontend

Sistema de Gestão de Academia — Frontend construído com Next.js 14, TailwindCSS, React Query e TypeScript.

## 🛠 Tecnologias

- **Next.js 14** — App Router
- **TypeScript** — Tipagem estrita
- **TailwindCSS** — Estilização
- **React Query (@tanstack/react-query)** — Gerenciamento de estado assíncrono
- **Axios** — Cliente HTTP com interceptors JWT

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- API Backend rodando (academia-backend)

## 🚀 Como rodar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env.local
   ```
   Edite `.env.local` e configure a URL da API:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura de Pastas

```
src/
  app/
    (auth)/login/         # Página de login
    (dashboard)/          # Layout + páginas autenticadas
      dashboard/          # Dashboard principal
      students/           # CRUD de alunos
      workouts/           # Treinos
      finance/            # Financeiro
      checkin/            # Check-in
      reports/            # Relatórios
  components/
    ui/                   # Button, Input, Card, Badge, Modal, Spinner, Table
    layout/               # Sidebar, Header, PageTitle
    students/             # StudentForm, StudentTable, StudentCard
    checkin/              # CheckinHistory
    finance/              # FinanceDashboard, FinanceTable
    workouts/             # WorkoutEditor, WorkoutList
  hooks/                  # React Query hooks
  services/               # Axios services
  types/                  # TypeScript interfaces
  providers/              # QueryProvider, AuthProvider
  lib/                    # Utilitários
```

## 📄 Páginas

| Rota | Descrição |
|------|-----------|
| `/login` | Autenticação |
| `/dashboard` | Visão geral com métricas |
| `/students` | CRUD de alunos |
| `/students/[id]` | Detalhes do aluno |
| `/workouts` | Gerenciar treinos |
| `/finance` | Cobranças e pagamentos |
| `/checkin` | Registrar e ver histórico de check-ins |
| `/reports` | Relatórios e métricas do mês |

## 🔐 Autenticação

O sistema usa JWT. O token é armazenado no `localStorage` e adicionado automaticamente em todas as requisições via interceptor do Axios. Em caso de resposta 401, o usuário é redirecionado para `/login`.
