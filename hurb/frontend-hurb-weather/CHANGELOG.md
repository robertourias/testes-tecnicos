# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

### Em desenvolvimento

- ETAPA 10 — Ícones Meteocons
- ETAPA 11 — Responsividade e Polimento
- ETAPA 12 — Testes E2E
- ETAPA 13 — Documentação Final
- ETAPA 9 — Página Principal
- ETAPA 10 — Ícones Meteocons
- ETAPA 11 — Responsividade e Polimento
- ETAPA 12 — Testes E2E
- ETAPA 13 — Documentação Final

---

## [0.9.0] - 2026-05-12

### ✨ Adicionado

#### Página Principal (ETAPA 9)

- `src/app/page.tsx` — página principal com `'use client'`; orquestra `useWeather` + `useTemperatureUnit`; computa `GradientTheme` via `getGradientTheme(forecast[0]?.temp)`
- `src/app/page.module.css` — layout flexbox centralizado; header com input e label de localidade; section para conteúdo; breakpoints mobile/desktop
- `src/app/__tests__/page.test.tsx` — 11 testes de integração via mock dos hooks

**Lógica de renderização condicional:**

- `loading=true` → `<LoadingState />`
- `!loading && error && !location` → `<ErrorMessage />` (erro de geolocalização)
- `!loading && !error && forecast.length > 0` → `<WeatherGrid />`
- Erro de busca (location existe) → exibido no `LocationInput` via `error` prop

**Testes (11 novos — total: 125)**

- happy path: 3 cards renderizados, nome da localidade, input com valor
- loading: LoadingState exibido, sem cards
- erro de geolocalização (sem location): ErrorMessage exibido, sem cards
- busca de nova cidade: chama setLocation
- toggle de unidade: chama toggleUnit, exibe °F
- gradiente: overlay com classe `warm` para 28°C

### 📝 Notas Técnicas

- `error` só é passado ao `LocationInput` quando `location` já existe (erro de busca). Para erros de geolocalização (sem location), apenas `ErrorMessage` é exibido — evita dois `role="alert"` simultâneos.
- Testes da página usam `jest.mock` nos hooks (não MSW) pela mesma razão dos testes de `useWeather`.

### 📊 Métricas

- 11 novos testes de integração da página
- Total da suíte: 125 testes em 16 suítes (0 falhas)

---

## [0.8.0] - 2026-05-12

### ✨ Adicionado

#### Componentes de UI (ETAPA 8)

- `BackgroundImage` — imagem fullscreen `position: fixed; z-index: -1` com overlay de gradiente dinâmico por `theme: GradientTheme`; transição `0.8s ease` ao trocar tema
- `LocationInput` — input controlado com estado local; busca ao `Enter` e `onBlur` (apenas se valor mudou); spinner `role="status"` quando `isLoading`; erro `role="alert"` quando `error`
- `WeatherCard` — exibe label do dia (`formatWeatherDate`), ícone OpenWeather CDN (substituir por Meteocons na ETAPA 10), temperatura como `<button>` que chama `onUnitToggle`, descrição; destaque visual via classe `today`
- `WeatherGrid` — CSS Grid 1 coluna (mobile) / 3 colunas (≥768px); delega toggle a todos os cards; primeiro card marcado como `isToday`
- `LoadingState` — 3 skeletons com animação `@keyframes shimmer` (opacity 0.5→1→0.5); `aria-busy="true"` na section
- `ErrorMessage` — mensagem com `role="alert"`, ícone ⚠, botão "Tentar novamente" com `aria-label`

**Testes** (29 novos — total: 114)

- `BackgroundImage.test.tsx` — 6 testes: src correto, null sem img, classe por tema (cold/warm/hot/neutral)
- `LocationInput.test.tsx` — 8 testes: valor inicial, Enter, blur com valor diferente, blur sem mudança, erro, spinner, disabled, sem spinner
- `WeatherCard.test.tsx` — 8 testes: Celsius, Fahrenheit, click toggle, classe today, sem today, descrição, alt do ícone, label "Hoje"
- `WeatherGrid.test.tsx` — 4 testes: 3 cards, 1 today, unidade F, toggle delegado
- `ErrorMessage.test.tsx` — 3 testes: mensagem, clique retry, botão presente

### 🔧 Configurado

- `jest.config.ts` — `testMatch` ampliado para incluir `**/components/**/*.test.{ts,tsx}` (testes co-localizados com componentes)

### 📝 Notas Técnicas

- `BackgroundImage` usa `<img alt="">` (decorativa) em vez de `next/image` — imagens do Bing são externas e o domínio muda; `next/image` exige configuração de `remotePatterns` por hostname específico
- `WeatherCard` usa ícone via CDN OpenWeather temporariamente — ETAPA 10 substituirá pelo pack Meteocon local
- Datas de test para `WeatherCard` usam formato `'YYYY-MM-DD HH:MM:SS'` em vez de `'YYYY-MM-DD'` para evitar parse UTC que causa offset de timezone em ambientes não-UTC

### 📊 Métricas

- 29 novos testes de componentes
- Total da suíte: 114 testes em 15 suítes (0 falhas)

---

## [0.7.0] - 2026-05-12

### ✨ Adicionado

#### Sistema de Design (ETAPA 7)

**Tokens CSS (`src/styles/tokens.css`)**

- Gradientes de fundo por tema: `--gradient-cold`, `--gradient-warm`, `--gradient-hot`, `--gradient-neutral` (linear-gradient com hsla para sobreposição sobre imagem)
- Tipografia: `--font-sans` referenciando `--font-inter` (variável CSS da fonte Next.js) com fallback completo; escala `--text-xs` a `--text-4xl`
- Espaçamento: `--space-1` a `--space-16` em escala rem
- Cores de texto e superfície: `--text-primary`, `--text-secondary`, `--surface-overlay`
- Breakpoints de referência: `--bp-md: 768px`, `--bp-lg: 1024px`

### 🔧 Configurado

**`src/app/globals.css`**

- Importação de `tokens.css` via `@import`
- Reset CSS com `box-sizing: border-box` em `*`, `*::before`, `*::after`
- `body` usando `var(--font-sans)` e `var(--text-base)` dos tokens
- `img { display: block; max-width: 100% }` adicionado ao reset

**`src/app/layout.tsx`**

- Substituído Geist (boilerplate Next.js) por `Inter` do `next/font/google`
- Fonte configurada com `variable: '--font-inter'`, `subsets: ['latin']`, `display: 'swap'`
- `lang="pt-BR"` no elemento `<html>`
- Metadata atualizada: título `'HURB Weather'`, descrição em português

### 📊 Métricas

- 85 testes passando (0 falhas) — nenhuma regressão

---

## [0.6.0] - 2026-05-12

### ✨ Adicionado

#### Custom Hooks (ETAPA 6)

**useGeolocation**

- `src/hooks/useGeolocation.ts` — wrapper para `navigator.geolocation.getCurrentPosition`
- Retorna `{ coordinates: Coordinates | null, error: string | null, loading: boolean }`
- Trata todos os casos de erro: `PERMISSION_DENIED` (1), `TIMEOUT` (3), `POSITION_UNAVAILABLE` (2)
- Verifica disponibilidade da API antes de chamar (`navigator.geolocation` pode ser `undefined`)
- Opções configuradas: `timeout: 10000`, `maximumAge: 60000`

**useTemperatureUnit**

- `src/hooks/useTemperatureUnit.ts` — gerencia unidade de temperatura global
- Retorna `{ unit: TemperatureUnit, toggleUnit: () => void }` com estado inicial `'C'`
- `toggleUnit` memoizado com `useCallback` — referência estável entre re-renders

**useWeather**

- `src/hooks/useWeather.ts` — hook principal de orquestração
- Fluxo automático: `useGeolocation` → `reverseGeocode` → `getWeatherForecast`
- `getBingDailyImage` buscado em paralelo via `Promise.all` com `getWeatherForecast`
- Retorna `{ location, forecast, backgroundImage, loading, error, setLocation }`
- `setLocation(loc)` dispara rebusca manual da previsão para qualquer cidade

**Testes**

- `src/hooks/__tests__/useGeolocation.test.tsx` — 6 testes: loading inicial, coordenadas retornadas, permissão negada, timeout, posição indisponível, geolocation ausente no browser
- `src/hooks/__tests__/useTemperatureUnit.test.tsx` — 4 testes: estado inicial `'C'`, toggle C→F, toggle F→C, estabilidade do callback
- `src/hooks/__tests__/useWeather.test.tsx` — 6 testes: fluxo completo, chamada com coordenadas corretas, Bing em paralelo com previsão, `setLocation` com nova cidade, erro de permissão, erro da API de previsão

### 🔧 Configurado

- `jest.config.ts` — adicionado `rettime` ao `transformIgnorePatterns`; pacote usa ESM e é dependência transitiva do MSW carregada ao usar `msw/src/core`

### 📝 Notas Técnicas

- Os testes de `useWeather` usam `jest.mock` nos módulos de serviço (em vez de MSW diretamente). O `next/jest` sobrescreve o `transformIgnorePatterns` do usuário, impedindo a transformação do `rettime`. Mock de módulo é mais rápido e determinístico para testes de hook.
- Os erros de geolocalização são comparados por código numérico (`err.code === 1`) em vez de `err.code === err.PERMISSION_DENIED`. O objeto `GeolocationPositionError` não é definido no ambiente jsdom.

### 📊 Métricas

- 17 novos testes de hooks
- Total da suíte: 85 testes em 10 suítes (0 falhas)

---

## [0.5.0] - 2026-05-12

### ✨ Adicionado

#### Serviços de API (ETAPA 5)

**OpenWeather**

- `src/services/openweather.ts` — `getWeatherForecast(location): Promise<WeatherDay[]>`
- Agrupa itens por dia e seleciona o mais próximo do meio-dia (12h) de cada dia
- Retorna exatamente 3 dias (hoje, amanhã, depois de amanhã)
- Erros descritivos por código HTTP: 404 (localidade), 401 (chave inválida), genérico

**OpenCage**

- `src/services/opencage.ts` — `reverseGeocode(lat, lng): Promise<string>`
- Fallback em cascata: `city → town → village → municipality → formatted`
- Erros descritivos por código HTTP: 401/403 (chave), 402 (cota excedida), genérico

**Bing Daily Image**

- `src/services/bing.ts` — `getBingDailyImage(): Promise<string>`
- Prefixação automática de URL relativa com `https://www.bing.com`

**Mocks MSW**

- `src/__mocks__/data/weather.ts` — 17 itens de previsão simulada (3 dias, várias horas) para Rio de Janeiro
- `src/__mocks__/data/geocode.ts` — resposta completa de geocodificação reversa para Copacabana, Rio de Janeiro
- `src/__mocks__/data/bing.ts` — resposta simulada da API Bing
- `src/__mocks__/handlers.ts` — handlers MSW para OpenWeather, OpenCage e Bing

**Testes**

- `src/services/__tests__/openweather.test.ts` — testes com mock de `fetch`: 3 dias retornados, temperaturas inteiras, erros 404/401/500, formato de ícone
- `src/services/__tests__/opencage.test.ts` — testes: cidade extraída, erro em falha
- `src/services/__tests__/bing.test.ts` — testes: URL completa retornada, erro em falha

### 📊 Métricas

- 68 testes totais antes desta versão

---

## [0.4.0] - 2026-05-12

### ✨ Adicionado

#### Utilitários (ETAPA 4)

- `src/utils/temperature.ts` — `celsiusToFahrenheit`, `fahrenheitToCelsius`, `formatTemperature`
- `src/utils/gradient.ts` — `getGradientTheme(temp)`: `null→neutral`, `<15→cold`, `15-35→warm`, `>35→hot`
- `src/utils/icons.ts` — `getMeteoconIcon(code)`: mapeia códigos OpenWeather (2xx, 3xx, 5xx, 6xx, 7xx, 800, 80x) para arquivos de ícone Meteocon com fallback
- `src/utils/date.ts` — `formatWeatherDate(dateStr)`: retorna `'Hoje'`, `'Amanhã'` ou `'Depois de amanhã'`
- `src/utils/index.ts` — re-exports centralizados
- Testes unitários para todos os utilitários cobrindo casos de borda

---

## [0.3.0] - 2026-05-12

### ✨ Adicionado

#### Tipos TypeScript (ETAPA 3)

- `src/types/weather.ts` — `OpenWeatherResponse`, `OpenWeatherForecastItem`, `WeatherDay`
- `src/types/geocode.ts` — `OpenCageResponse`, `OpenCageResult`, `Coordinates`
- `src/types/ui.ts` — `TemperatureUnit = 'C' | 'F'`, `GradientTheme = 'cold' | 'warm' | 'hot' | 'neutral'`
- `src/types/index.ts` — re-exports centralizados

---

## [0.2.0] - 2026-05-12

### ✨ Adicionado

#### Docker (ETAPA 2)

- `Dockerfile` multi-stage: `base` (node:20-alpine), `development` (npm install + dev), `builder` (npm ci + build), `production` (standalone)
- `docker-compose.yml` com perfis `dev` (volumes para hot reload) e `prod` (build otimizado)
- `.dockerignore` excluindo `node_modules`, `.next`, `.git`, `.env.local`, `coverage`, `.claude`

### 🔧 Configurado

- `next.config.ts` com `output: 'standalone'` e `images.remotePatterns` para `www.bing.com`

---

## [0.1.0] - 2026-05-11

### ✨ Adicionado

#### Setup do Projeto (ETAPA 1)

**Framework e Ambiente**

- Next.js 16.2.6 com TypeScript 5.x
- App Router habilitado
- React 19.2.4 e React DOM 19.2.4
- ESLint 9.x com configuração Next.js
- Prettier 3.8.3 para formatação de código

**Estrutura de Diretórios**

- `src/components/` — Componentes React reutilizáveis
- `src/hooks/` — Custom hooks
- `src/services/` — Camada de comunicação com APIs externas
- `src/utils/` — Funções utilitárias puras
- `src/types/` — Definições de tipos TypeScript
- `src/styles/` — Tokens CSS e estilos globais
- `src/__mocks__/` — Mocks para testes (MSW handlers e server)
- `public/icons/` — Diretório para ícones Meteocons
- `tests/e2e/` — Testes end-to-end com Playwright

**Configuração de Testes**

- Jest 30.4.2 configurado com cobertura de código
- @testing-library/react 16.3.2 para testes de componentes
- @testing-library/jest-dom 6.9.1 para matchers customizados
- @testing-library/user-event 14.6.1 para simulação de interações
- jest-environment-jsdom 30.4.1 para ambiente de testes DOM
- ts-node 10.9.2 para execução de arquivos TypeScript no Jest
- MSW (Mock Service Worker) 2.14.6 para mock de APIs
- Playwright 1.60.0 para testes E2E
- Chromium instalado como navegador de teste

**Sistema de Design**

- `src/styles/tokens.css` com variáveis CSS:
  - Cores de gradiente por tema (cold, warm, hot, neutral)
  - Tipografia (família Inter + escalas de tamanho)
  - Espaçamento (escala de 0.25rem a 4rem)
  - Cores de texto e superfície

**Configurações de Desenvolvimento**

- `.prettierrc` com semicolons, single quotes, print width 100, trailing comma ES5
- `.gitignore` completo para Node.js, Next.js e ferramentas de teste
- `.env.example` com template de variáveis de ambiente

**Scripts NPM**

- `dev` — Servidor de desenvolvimento Next.js
- `build` — Build de produção
- `start` — Servidor de produção
- `lint` — Verificação de código com ESLint
- `format` / `format:check` — Formatação com Prettier
- `test` / `test:watch` / `test:coverage` — Testes unitários com Jest
- `test:e2e` / `test:e2e:ui` — Testes E2E com Playwright

**Arquivos de Configuração**

- `jest.config.ts` — Jest com suporte TypeScript, CSS Modules e alias `@/*`
- `jest.setup.ts` — Setup global com @testing-library/jest-dom e polyfills
- `playwright.config.ts` — Playwright com servidor dev integrado
- `tsconfig.json` — TypeScript com path alias `@/*` → `src/*`

**Testes Iniciais**

- `tests/e2e/smoke.spec.ts` — Teste E2E de smoke para validar setup

**Documentação**

- `CLAUDE.md` — Contexto do projeto para Claude Code
- `.claude/rules/coding-standards.md` — Padrões de código TypeScript/React
- `.claude/rules/testing.md` — Convenções de testes
- `docs/BACKLOG.md` — Plano de desenvolvimento em etapas
- `docs/CHALLENGE.md` — Especificação do desafio técnico

### 📝 Notas Técnicas

- MSW não integrado ao `jest.setup.ts` globalmente para evitar problemas de compatibilidade ESM/CJS. Testes com mock de API configuram o server individualmente.
- Prettier configurado com `endOfLine: lf` para consistência entre ambientes.
- Path alias `@/` → `src/` para imports mais limpos.

---

## Formato do Changelog

### Tipos de Mudanças

- **✨ Adicionado** — Para novas funcionalidades
- **🔧 Configurado** — Para mudanças em configurações existentes
- **🔄 Modificado** — Para mudanças em funcionalidades existentes
- **🗑️ Removido** — Para funcionalidades removidas
- **🐛 Corrigido** — Para correções de bugs
- **🔒 Segurança** — Para correções de vulnerabilidades
- **📝 Notas Técnicas** — Para informações técnicas relevantes
