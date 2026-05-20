# HURB Weather Microsite — Claude Project Context

## Projeto

Microsite responsivo de previsão do tempo desenvolvido com **Next.js + TypeScript** como desafio técnico para a HURB.

- **Desafio:** [`docs/CHALLENGE.md`](./docs/CHALLENGE.md)
- **Backlog:** [`docs/BACKLOG.md`](./docs/BACKLOG.md)
- **Melhorias propostas:** [`docs/MELHORIAS.md`](./docs/MELHORIAS.md)
- **Layout de referência:** [`docs/exemplo.jpg`](./docs/exemplo.jpg)

---

## Stack Tecnológica

| Camada                        | Tecnologia                                          |
| ----------------------------- | --------------------------------------------------- |
| Framework                     | Next.js 16 (App Router) com TypeScript 5            |
| Estilo                        | CSS Modules + CSS Variables                         |
| Testes unitários / integração | Jest + Testing Library + MSW                        |
| Testes E2E                    | Playwright                                          |
| Container                     | Docker multi-stage (`development` + `production`)   |
| Ícones                        | SVGs customizados em `public/icons/`                |

---

## APIs Externas

```
OpenWeather → https://api.openweathermap.org/data/2.5/forecast
              ?q={location}          ← busca por nome (manual)
              ?lat={lat}&lon={lon}   ← busca por coordenadas (geo)
              &appid={key}&units=metric&lang=pt_br

OpenCage    → https://api.opencagedata.com/geocode/v1/json
              ?q={lat},{lng}&key={key}&language=en
              (reverse geocode: coords → nome da cidade)

Bing Image  → /api/bing-image  ← proxy Next.js (CORS)
              → server: https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR
```

> **Bing:** chamadas diretas do browser são bloqueadas por CORS. Usar sempre o proxy local `/api/bing-image` (Route Handler em `src/app/api/bing-image/route.ts`).

As chaves de API ficam em `.env.local` (não commitado). Referência: `.env.example`.

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/bing-image/route.ts → Proxy server-side para o Bing (CORS)
│   ├── layout.tsx              → Layout raiz (Inter, metadata, h1 acessível)
│   ├── page.tsx                → Página principal ('use client')
│   └── globals.css             → Reset CSS + import de tokens
├── components/                 → Componentes de UI (CSS Modules)
│   ├── BackgroundImage/        → Fullscreen + overlay de gradiente dinâmico
│   ├── ErrorMessage/           → Mensagem de erro + botão retry
│   ├── LoadingState/           → 3 skeletons com shimmer animation
│   ├── LocationInput/          → Input de busca com spinner e erro inline
│   ├── WeatherCard/            → Card de um dia (temperatura clicável)
│   └── WeatherGrid/            → Grid responsivo com 3 WeatherCards
├── hooks/
│   ├── useGeolocation.ts       → navigator.geolocation com suporte a retry (retryCount)
│   ├── useTemperatureUnit.ts   → Toggle °C / °F (useCallback memoizado)
│   └── useWeather.ts           → Orquestrador: expõe setLocation + retryGeolocation
├── services/
│   ├── bing.ts                 → getBingDailyImage() — chama /api/bing-image
│   ├── opencage.ts             → reverseGeocode(lat, lon) → string
│   └── openweather.ts          → getWeatherForecast(city) + getWeatherForecastByCoords(lat, lon)
├── styles/
│   └── tokens.css              → CSS Variables: gradientes, tipografia, espaçamento, breakpoints
├── types/
│   ├── weather.ts              → OpenWeatherForecastResponse, OpenWeatherForecastItem, WeatherDay
│   ├── geocode.ts              → OpenCageResponse, Coordinates
│   └── ui.ts                  → TemperatureUnit, GradientTheme
└── utils/                      → temperature, gradient, icons, date
public/
└── icons/                      → SVGs: sun, cloud, cloud-sun, cloud-rain, cloud-drizzle,
                                   cloud-snow, cloud-flash, cloud-fog, cloud-hail
tests/
└── e2e/                        → Playwright: smoke, home, location, temperature, responsive
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

## Fluxo de Trabalho com Git

> **IMPORTANTE:** Nunca criar commits sem confirmação explícita do usuário.

Ao concluir uma tarefa ou etapa:

1. Apresentar o resumo das mudanças
2. Aguardar confirmação do usuário antes de executar `git commit`
3. Só então criar o commit seguindo Conventional Commits

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

# Lint
npm run lint
```

---

## Estado Atual do Projeto

### ✅ Todas as 13 etapas do backlog concluídas

- **ETAPA 1** — Setup do Projeto (v0.1.0)
- **ETAPA 2** — Docker (v0.2.0)
- **ETAPA 3** — Tipos TypeScript (v0.3.0)
- **ETAPA 4** — Utilitários (v0.4.0)
- **ETAPA 5** — Serviços de API (v0.5.0)
- **ETAPA 6** — Custom Hooks (v0.6.0)
- **ETAPA 7** — Sistema de Design (v0.7.0)
- **ETAPA 8** — Componentes de UI (v0.8.0)
- **ETAPA 9** — Página Principal (v0.9.0)
- **ETAPA 10** — Ícones Meteocons (v0.10.0)
- **ETAPA 11** — Responsividade e Polimento (v0.11.0)
- **ETAPA 12** — Testes E2E (v0.12.0)
- **ETAPA 13** — Documentação Final (v0.13.0)

### Correções e melhorias pós-backlog

- Proxy Bing CORS via Route Handler (`/api/bing-image`)
- Guard de localidade vazia em `getWeatherForecast`
- `retryGeolocation()` em `useWeather` (re-dispara geo sem reload)
- `getWeatherForecastByCoords(lat, lon)` para consulta direta por coordenadas
- API OpenWeather: `/data/2.5/forecast` com `q=` (busca por nome) ou `lat=/lon=` (coords)
- 154 testes passando (Jest) + 21 E2E (Playwright)
