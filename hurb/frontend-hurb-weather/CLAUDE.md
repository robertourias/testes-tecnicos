# HURB Weather Microsite — Claude Project Context

## Projeto

Microsite responsivo de previsão do tempo desenvolvido com **Next.js + TypeScript** como desafio técnico para a HURB.

- **Desafio:** [`docs/CHALLENGE.md`](./docs/CHALLENGE.md)
- **Backlog:** [`docs/BACKLOG.md`](./docs/BACKLOG.md)
- **Melhorias propostas:** [`docs/MELHORIAS.md`](./docs/MELHORIAS.md) _(a criar)_
- **Layout de referência:** [`docs/exemplo.jpg`](./docs/exemplo.jpg)

---

## Stack Tecnológica

| Camada                        | Tecnologia                                          |
| ----------------------------- | --------------------------------------------------- |
| Framework                     | Next.js 14+ (App Router) com TypeScript             |
| Estilo                        | CSS Modules                                         |
| Testes unitários / integração | Jest + Testing Library + MSW                        |
| Testes E2E                    | Playwright                                          |
| Container                     | Docker multi-stage (`development` + `production`)   |
| Ícones                        | Meteocons (http://www.alessioatzeni.com/meteocons/) |

---

## APIs Externas

```
OpenWeather → http://api.openweathermap.org/data/2.5/forecast?q={location}&APPID={key}&units=metric&lang=pt_br
OpenCage    → https://api.opencagedata.com/geocode/v1/json?q={lat},{lng}&key={key}&language=en
Bing Image  → https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR
```

As chaves de API ficam em `.env.local` (não commitado). Referência de variáveis: `.env.example`.

---

## Estrutura do Projeto

```
hurb/
├── CLAUDE.md
├── docs/
│   ├── CHALLENGE.md       → Especificação do desafio
│   ├── BACKLOG.md         → Plano de desenvolvimento em etapas
│   ├── MELHORIAS.md       → Melhorias propostas ao layout (a criar)
│   └── exemplo.jpg        → Layout de referência visual
├── .claude/               → Configuração do Claude Code (ver abaixo)
└── src/                   → Código-fonte da aplicação (a criar)
    ├── app/               → Rotas Next.js (App Router)
    ├── components/        → Componentes de UI reutilizáveis
    ├── hooks/             → Custom hooks (useWeather, useGeolocation, useTemperatureUnit)
    ├── services/          → Chamadas às APIs externas
    ├── utils/             → Funções puras (temperatura, gradiente, ícones)
    ├── types/             → Interfaces e tipos TypeScript
    └── styles/            → Tokens CSS globais e reset
```

---

## Configuração Claude

Rules, agents e skills estão em `.claude/` e são carregados automaticamente.

---

## Convenções Rápidas

- **Idioma do código:** inglês (variáveis, funções, componentes)
- **Idioma dos comentários/docs:** português
- **Commits:** Conventional Commits em português — `feat:`, `fix:`, `test:`, `docs:`, `chore:`
- **Componentes:** CSS Modules — sem Tailwind, sem styled-components, sem style inline para layout
- **TypeScript:** sempre tipar retorno de funções; nunca usar `any`
- **`'use client'`:** apenas quando estritamente necessário (interatividade, browser APIs)

---

## Comandos

```bash
# Desenvolvimento (Docker)
docker compose --profile dev up

# Produção (Docker)
docker compose --profile prod up --build

# Localmente
npm install && npm run dev

# Testes unitários + integração
npm run test

# Testes E2E
npm run test:e2e
```

---

## Manutenção da Documentação

**IMPORTANTE:** A cada etapa concluída do backlog, atualizar obrigatoriamente:

### 1. `docs/BACKLOG.md`

- Marcar tarefas concluídas com `[x]`
- Adicionar ✅ ao título da etapa concluída
- Manter checkboxes claros e organizados

**Exemplo:**

```markdown
## ETAPA X — Nome da Etapa ✅

### X.1 — Subtarefa ✅

- [x] Tarefa concluída
- [x] Outra tarefa concluída
```

### 2. `CHANGELOG.md`

- Criar nova seção de versão `[X.Y.Z]` com data
- Mover itens de `[Unreleased]` para a nova versão
- Documentar todas as adições, configurações e mudanças
- Incluir métricas relevantes (tamanhos, performance, etc.)

**Estrutura da entrada:**

```markdown
## [X.Y.Z] - YYYY-MM-DD

### ✨ Adicionado

- Funcionalidade X
- Funcionalidade Y

### 🔧 Configurado

- Configuração A
- Configuração B

### 📊 Métricas

- Métrica relevante

### ✅ Validado

- ✅ Teste validado
```

### 3. Commit

Criar commit seguindo Conventional Commits:

```bash
git add docs/BACKLOG.md CHANGELOG.md [outros arquivos]
git commit -m "feat/docs: [descrição da etapa]

[Detalhes da implementação]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Estado Atual do Projeto

### ✅ Etapas Concluídas

- **ETAPA 1** — Setup do Projeto (v0.1.0)
- **ETAPA 2** — Docker (v0.2.0)

### 🚧 Próximas Etapas

- **ETAPA 3** — Tipos TypeScript
- **ETAPA 4** — Utilitários (funções puras)
- **ETAPA 5** — Serviços (chamadas de API)
- **ETAPA 6** — Custom Hooks
- **ETAPA 7** — Sistema de Design (CSS)
- **ETAPA 8** — Componentes de UI
- **ETAPA 9** — Página Principal
- **ETAPA 10** — Ícones Meteocons
- **ETAPA 11** — Responsividade e Polimento
- **ETAPA 12** — Testes E2E
- **ETAPA 13** — Documentação Final
