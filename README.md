# Questionário - Engenharia de Software PUC Minas

Aplicação web para coleta de respostas anônimas de alunos de Engenharia de Software da PUC Minas. Formulário multi-etapas com 6 seções, salvo no Supabase.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Banco de dados:** Supabase (PostgreSQL)
- **Animações:** Framer Motion
- **Validação:** Zod
- **Deploy:** Vercel

## Setup Local

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Edite o arquivo `.env.local` com as credenciais do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 3. Criar tabela no Supabase

Acesse o **SQL Editor** do Supabase e execute o conteúdo de [`supabase/create-table.sql`](./supabase/create-table.sql).

### 4. Adicionar logo

Coloque o arquivo `logo-puc-minas.png` na pasta `public/`.

### 5. Preencher lista de matérias

Edite `src/constants/materias.ts` e preencha o array `MATERIAS` com todas as disciplinas do curso.

### 6. Configurar URL de compartilhamento

Edite `src/constants/options.ts` e substitua `[URL_DO_FORMULARIO]` pela URL real do deploy na Vercel.

### 7. Rodar localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

1. Conecte o repositório no [vercel.com](https://vercel.com)
2. Adicione as variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` nas settings do projeto
3. O deploy será automático a cada push

## Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Tema Tailwind + estilos base
│   ├── layout.tsx           # Layout raiz (font, metadata, lang)
│   └── page.tsx             # Orquestrador do formulário
├── components/
│   ├── fields/              # Campos reutilizáveis (Select, Radio, Checkbox, Autocomplete, etc.)
│   ├── sections/            # Seções do questionário (1-6)
│   ├── Header.tsx           # Cabeçalho fixo
│   ├── ProgressBar.tsx      # Barra de progresso
│   ├── NavigationButtons.tsx # Anterior / Próximo / Enviar
│   ├── SuccessScreen.tsx    # Tela de agradecimento
│   └── ShareButton.tsx      # Copiar texto de compartilhamento
├── constants/
│   ├── materias.ts          # Lista de disciplinas (preencher manualmente)
│   └── options.ts           # Opções de seleção
├── lib/
│   └── supabase.ts          # Cliente Supabase
├── schemas/
│   └── survey.ts            # Schemas Zod por seção
└── types/
    └── survey.ts            # Tipos TypeScript + constantes
```
