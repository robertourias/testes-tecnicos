# BACKLOG — HURB Weather Microsite

> Etapas granulares para execução via prompts focados.
> Cada tarefa representa um prompt independente.

---

## ⚠️ INSTRUÇÕES DE USO

**Ao concluir cada etapa:**

1. ✅ Marcar todas as tarefas concluídas com `[x]`
2. ✅ Adicionar emoji ✅ ao título da etapa concluída
3. 📝 Atualizar `CHANGELOG.md` com nova versão e detalhes
4. 💾 Commitar mudanças com mensagem descritiva

**Formato de marcação:**

```markdown
## ETAPA X — Nome da Etapa ✅

### X.Y — Subtarefa ✅

- [x] Tarefa concluída
- [x] Outra tarefa
```

---

## 📊 Progresso Geral

| Etapa | Status | Versão |
| ----- | ------ | ------ |
| 1     | ✅     | v0.1.0 |
| 2     | ✅     | v0.2.0 |
| 3     | ✅     | v0.3.0 |
| 4     | ✅     | v0.4.0 |
| 5     | ✅     | v0.5.0 |
| 6     | ✅     | v0.6.0 |
| 7     | ⏳     | -      |
| 8     | ⏳     | -      |
| 9     | ⏳     | -      |
| 10    | ⏳     | -      |
| 11    | ⏳     | -      |
| 12    | ⏳     | -      |
| 13    | ⏳     | -      |

**Legenda:**

- ✅ Concluído
- 🚧 Em andamento
- ⏳ Aguardando

---

## ETAPA 1 — Setup do Projeto ✅

### 1.1 — Inicializar Next.js ✅

- [x] Rodar `npx create-next-app@latest` com TypeScript, App Router, CSS Modules, ESLint
- [x] Remover boilerplate padrão (página inicial, estilos globais de exemplo)
- [x] Confirmar que `npm run dev` sobe sem erros

### 1.2 — Estrutura de pastas ✅

- [x] Criar pastas: `src/components`, `src/hooks`, `src/services`, `src/utils`, `src/types`, `src/styles`
- [x] Criar pasta `public/icons` para os Meteocons
- [x] Criar `src/styles/tokens.css` com variáveis CSS (cores, tipografia, espaçamento)

### 1.3 — Variáveis de ambiente ✅

- [x] Criar `.env.example` com `NEXT_PUBLIC_OPENWEATHER_APPID` e `NEXT_PUBLIC_OPENCAGE_API_KEY`
- [x] Criar `.env.local` com os valores reais
- [x] Adicionar `.env.local` ao `.gitignore`

### 1.4 — ESLint e Prettier ✅

- [x] Instalar e configurar Prettier
- [x] Criar `.prettierrc` e `.eslintrc` com regras do projeto
- [x] Adicionar scripts `lint` e `format` ao `package.json`

### 1.5 — Configurar Jest + Testing Library ✅

- [x] Instalar `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `jest-environment-jsdom`
- [x] Criar `jest.config.ts` e `jest.setup.ts`
- [x] Adicionar script `test` e `test:coverage` ao `package.json`
- [x] Confirmar que `npm run test` executa sem erros

### 1.6 — Configurar MSW ✅

- [x] Instalar `msw`
- [x] Criar `src/__mocks__/server.ts` e `src/__mocks__/handlers.ts` (vazio por enquanto)
- [x] Integrar `server` ao `jest.setup.ts`

### 1.7 — Configurar Playwright ✅

- [x] Instalar `@playwright/test` e rodar `npx playwright install`
- [x] Criar `playwright.config.ts`
- [x] Adicionar script `test:e2e` ao `package.json`
- [x] Criar teste E2E mínimo (`tests/e2e/smoke.spec.ts`) para validar setup

---

## ETAPA 2 — Docker ✅

### 2.1 — Dockerfile multi-stage ✅

- [x] Criar `Dockerfile` com stages: `base`, `development`, `builder`, `production`
- [x] Stage `development`: `npm install` + `npm run dev` na porta 3000
- [x] Stage `production`: `npm run build` + `output: standalone` + `node server.js`

### 2.2 — docker-compose.yml ✅

- [x] Criar `docker-compose.yml` com perfil `dev` e perfil `prod`
- [x] Perfil `dev`: monta volumes para hot reload
- [x] Perfil `prod`: build otimizado sem volumes

### 2.3 — .dockerignore e next.config.ts ✅

- [x] Criar `.dockerignore` excluindo `node_modules`, `.next`, `.git`, `.env.local`, `coverage`
- [x] Configurar `next.config.ts` com `output: 'standalone'` e `images.remotePatterns` para Bing

### 2.4 — Validação Docker ✅

- [x] Testar `docker compose --profile dev up` do zero
- [x] Confirmar acesso em `http://localhost:3000`
- [x] Testar `docker compose --profile prod up --build`

---

## ETAPA 3 — Tipos TypeScript ✅

### 3.1 — Tipos de Weather ✅

- [x] Criar `src/types/weather.ts` com `OpenWeatherResponse` (resposta bruta da API)
- [x] Criar tipo `WeatherDay` normalizado: `{ date, temp, feelsLike, description, icon }`

### 3.2 — Tipos de Geocode ✅

- [x] Criar `src/types/geocode.ts` com `OpenCageResponse` (resposta bruta)
- [x] Criar tipo `Coordinates`: `{ lat: number; lng: number }`

### 3.3 — Tipos de UI ✅

- [x] Criar `src/types/ui.ts` com `TemperatureUnit = 'C' | 'F'`
- [x] Criar tipo `GradientTheme = 'cold' | 'warm' | 'hot' | 'neutral'`

---

## ETAPA 4 — Utilitários (funções puras) ✅

### 4.1 — Conversão de temperatura ✅

- [x] Criar `src/utils/temperature.ts`
- [x] Implementar `celsiusToFahrenheit(c: number): number`
- [x] Implementar `fahrenheitToCelsius(f: number): number`
- [x] Implementar `formatTemperature(temp: number, unit: TemperatureUnit): string`

### 4.2 — Testes de temperatura ✅

- [x] Criar `src/utils/__tests__/temperature.test.ts`
- [x] Testar conversões com valores típicos e extremos (0°C, 100°C, -40°C)
- [x] Testar formatação com ambas as unidades

### 4.3 — Gradiente de cor ✅

- [x] Criar `src/utils/gradient.ts`
- [x] Implementar `getGradientTheme(temp: number | null): GradientTheme`
  - `null` → `'neutral'` (cinza)
  - `< 15` → `'cold'` (azul)
  - `15–35` → `'warm'` (amarelo)
  - `> 35` → `'hot'` (vermelho)

### 4.4 — Testes de gradiente ✅

- [x] Criar `src/utils/__tests__/gradient.test.ts`
- [x] Testar todos os ranges incluindo bordas (15, 35) e null

### 4.5 — Mapeamento de ícones Meteocons ✅

- [x] Criar `src/utils/icons.ts`
- [x] Implementar `getMeteoconIcon(weatherCode: number): string` mapeando códigos OpenWeather → arquivo de ícone
- [x] Cobrir grupos: 2xx (tempestade), 3xx (garoa), 5xx (chuva), 6xx (neve), 7xx (atmosfera), 800 (limpo), 80x (nuvens)

### 4.6 — Testes de ícones ✅

- [x] Criar `src/utils/__tests__/icons.test.ts`
- [x] Testar pelo menos um código por grupo + fallback para código desconhecido

### 4.7 — Formatação de data ✅

- [x] Criar `src/utils/date.ts`
- [x] Implementar `formatWeatherDate(dateStr: string): string` retornando label: `'Hoje'`, `'Amanhã'`, `'Depois de amanhã'`

### 4.8 — Testes de data ✅

- [x] Criar `src/utils/__tests__/date.test.ts`
- [x] Testar os 3 labels a partir de datas mockadas

---

## ETAPA 5 — Serviços (chamadas de API) ✅

### 5.1 — Serviço OpenWeather ✅

- [x] Criar `src/services/openweather.ts`
- [x] Implementar `getWeatherForecast(location: string): Promise<WeatherDay[]>`
- [x] Retornar array de 3 dias (hoje, amanhã, depois de amanhã) com dados normalizados
- [x] Lançar `Error` com mensagem descritiva em caso de falha HTTP

### 5.2 — Dados mock OpenWeather ✅

- [x] Criar `src/__mocks__/data/weather.ts` com resposta simulada (17 itens em `list`)
- [x] Adicionar handler MSW para `api.openweathermap.org` em `handlers.ts`

### 5.3 — Testes do serviço OpenWeather ✅

- [x] Criar `src/services/__tests__/openweather.test.ts`
- [x] Testar: retorna 3 dias corretamente
- [x] Testar: lança erro em resposta 404
- [x] Testar: lança erro em resposta 401 (chave inválida)

### 5.4 — Serviço OpenCage ✅

- [x] Criar `src/services/opencage.ts`
- [x] Implementar `reverseGeocode(lat: number, lng: number): Promise<string>`
- [x] Extrair nome da cidade de `results[0].components.city` ou fallback para `formatted`
- [x] Lançar `Error` com mensagem descritiva em caso de falha

### 5.5 — Dados mock OpenCage ✅

- [x] Criar `src/__mocks__/data/geocode.ts` com resposta simulada para Rio de Janeiro
- [x] Adicionar handler MSW para `api.opencagedata.com` em `handlers.ts`

### 5.6 — Testes do serviço OpenCage ✅

- [x] Criar `src/services/__tests__/opencage.test.ts`
- [x] Testar: retorna nome da cidade corretamente
- [x] Testar: lança erro em resposta de falha

### 5.7 — Serviço Bing ✅

- [x] Criar `src/services/bing.ts`
- [x] Implementar `getBingDailyImage(): Promise<string>` retornando URL completa da imagem
- [x] Prefixar URL relativa com `https://www.bing.com`

### 5.8 — Dados mock Bing ✅

- [x] Criar `src/__mocks__/data/bing.ts` com resposta simulada
- [x] Adicionar handler MSW para `bing.com/HPImageArchive.aspx` em `handlers.ts`

### 5.9 — Testes do serviço Bing ✅

- [x] Criar `src/services/__tests__/bing.test.ts`
- [x] Testar: retorna URL completa e válida
- [x] Testar: lança erro em resposta de falha

---

## ETAPA 6 — Custom Hooks ✅

### 6.1 — useGeolocation ✅

- [x] Criar `src/hooks/useGeolocation.ts`
- [x] Usar `navigator.geolocation.getCurrentPosition`
- [x] Retornar `{ coordinates, error, loading }`
- [x] Tratar casos: permissão negada, timeout, indisponível

### 6.2 — Testes de useGeolocation ✅

- [x] Criar `src/hooks/__tests__/useGeolocation.test.tsx`
- [x] Mock de `navigator.geolocation`
- [x] Testar: loading inicial → coordenadas retornadas
- [x] Testar: loading inicial → erro de permissão

### 6.3 — useTemperatureUnit ✅

- [x] Criar `src/hooks/useTemperatureUnit.ts`
- [x] Retornar `{ unit, toggleUnit }` (estado inicial: `'C'`)
- [x] `toggleUnit` alterna entre `'C'` e `'F'`

### 6.4 — Testes de useTemperatureUnit ✅

- [x] Criar `src/hooks/__tests__/useTemperatureUnit.test.tsx`
- [x] Testar: estado inicial é `'C'`
- [x] Testar: toggle alterna para `'F'`
- [x] Testar: toggle volta para `'C'`

### 6.5 — useWeather ✅

- [x] Criar `src/hooks/useWeather.ts`
- [x] Orquestrar: `useGeolocation` → `reverseGeocode` → `getWeatherForecast`
- [x] Retornar `{ location, forecast, backgroundImage, loading, error, setLocation }`
- [x] `setLocation` permite trocar localidade manualmente (rebusca a previsão)
- [x] Buscar `getBingDailyImage` em paralelo com o fluxo de previsão

### 6.6 — Testes de useWeather ✅

- [x] Criar `src/hooks/__tests__/useWeather.test.tsx`
- [x] Mock das funções de serviço via `jest.mock`
- [x] Mock de `navigator.geolocation`
- [x] Testar: fluxo completo — geoloc → geocode → previsão → loading false
- [x] Testar: `setLocation` com nova cidade atualiza `forecast`
- [x] Testar: erro de geolocalização expõe `error` no retorno

---

## ETAPA 7 — Sistema de Design (CSS)

### 7.1 — Tokens CSS globais

- [ ] Criar/atualizar `src/styles/tokens.css` com:
  - Gradientes: `--gradient-cold`, `--gradient-warm`, `--gradient-hot`, `--gradient-neutral`
  - Tipografia: variáveis de tamanho e família (`Inter` via Google Fonts)
  - Espaçamento: `--space-1` a `--space-16`
  - Cores de texto e superfície

### 7.2 — Reset e globals

- [ ] Atualizar `src/app/globals.css` com reset CSS e importação dos tokens
- [ ] Importar fonte `Inter` do Google Fonts no `layout.tsx`

---

## ETAPA 8 — Componentes de UI

### 8.1 — BackgroundImage

- [ ] Criar `src/components/BackgroundImage/` (index.ts, .tsx, .module.css)
- [ ] Imagem fullscreen com `position: fixed`, `z-index: -1`
- [ ] Overlay com gradiente dinâmico via prop `theme: GradientTheme`
- [ ] Transição CSS suave ao trocar tema (`transition: background 0.8s ease`)

### 8.2 — Teste de BackgroundImage

- [ ] Testar: renderiza imagem com src correto
- [ ] Testar: aplica classe CSS correta por tema

### 8.3 — LocationInput

- [ ] Criar `src/components/LocationInput/` (index.ts, .tsx, .module.css)
- [ ] Input controlado com valor atual da localidade
- [ ] Disparar busca no `Enter` e no `onBlur`
- [ ] Exibir spinner quando `isLoading=true`
- [ ] Exibir mensagem de erro quando `error` está presente

### 8.4 — Teste de LocationInput

- [ ] Testar: renderiza com valor inicial
- [ ] Testar: chama `onSearch` ao pressionar Enter
- [ ] Testar: chama `onSearch` ao perder foco
- [ ] Testar: exibe mensagem de erro
- [ ] Testar: exibe estado de loading

### 8.5 — WeatherCard

- [ ] Criar `src/components/WeatherCard/` (index.ts, .tsx, .module.css)
- [ ] Exibir: label do dia, ícone Meteocon, temperatura formatada, descrição
- [ ] Temperatura é um `<button>` que chama `onUnitToggle`
- [ ] Highlight visual quando `isToday=true`

### 8.6 — Teste de WeatherCard

- [ ] Testar: exibe temperatura em Celsius
- [ ] Testar: exibe temperatura em Fahrenheit
- [ ] Testar: chama `onUnitToggle` ao clicar na temperatura
- [ ] Testar: aplica classe de destaque quando `isToday=true`

### 8.7 — WeatherGrid

- [ ] Criar `src/components/WeatherGrid/` (index.ts, .tsx, .module.css)
- [ ] Grid responsivo: 1 coluna em mobile, 3 colunas em desktop
- [ ] Renderizar 3 `WeatherCard`s

### 8.8 — Teste de WeatherGrid

- [ ] Testar: renderiza exatamente 3 cards
- [ ] Testar: passa props corretas para cada card

### 8.9 — LoadingState

- [ ] Criar `src/components/LoadingState/` (index.ts, .tsx, .module.css)
- [ ] Skeleton de 3 cards com animação de shimmer (`@keyframes`)

### 8.10 — ErrorMessage

- [ ] Criar `src/components/ErrorMessage/` (index.ts, .tsx, .module.css)
- [ ] Exibir mensagem de erro com ícone
- [ ] Botão "Tentar novamente" que chama prop `onRetry`

### 8.11 — Teste de ErrorMessage

- [ ] Testar: exibe mensagem correta
- [ ] Testar: chama `onRetry` ao clicar no botão

---

## ETAPA 9 — Página Principal

### 9.1 — Montar layout da página

- [ ] Atualizar `src/app/page.tsx` usando `useWeather` e `useTemperatureUnit`
- [ ] Renderizar: `BackgroundImage`, `LocationInput`, `WeatherGrid` ou `LoadingState` ou `ErrorMessage`
- [ ] Passar tema do gradiente baseado na temperatura do dia atual

### 9.2 — Teste de integração da página

- [ ] Criar `src/app/__tests__/page.test.tsx`
- [ ] Usar MSW + mock de geolocalização
- [ ] Testar: fluxo completo do happy path (geoloc → previsão renderizada)
- [ ] Testar: estado de loading exibido enquanto aguarda APIs
- [ ] Testar: exibe `ErrorMessage` em caso de falha na geolocalização

---

## ETAPA 10 — Ícones Meteocons

### 10.1 — Download dos ícones

- [ ] Baixar pack de ícones de http://www.alessioatzeni.com/meteocons/
- [ ] Salvar os arquivos necessários em `public/icons/`
- [ ] Confirmar que os nomes de arquivo batem com o mapeamento em `src/utils/icons.ts`

---

## ETAPA 11 — Responsividade e Polimento

### 11.1 — Ajustes mobile

- [ ] Verificar layout em 375px: input, cards em coluna, tamanho de fonte
- [ ] Garantir temperatura legível e clicável no mobile (área de toque ≥ 44px)

### 11.2 — Ajustes tablet e desktop

- [ ] Verificar layout em 768px e 1280px
- [ ] Ajustar `gap` e `padding` do grid por breakpoint

### 11.3 — Animações e transições

- [ ] Fade-in nos `WeatherCard`s ao carregar dados
- [ ] Transição suave no gradiente ao trocar de localidade
- [ ] Transição no texto da temperatura ao trocar unidade

### 11.4 — Acessibilidade

- [ ] Confirmar `aria-label` em todos os elementos interativos
- [ ] Verificar contraste de texto sobre os gradientes (WCAG AA)
- [ ] Garantir navegação por teclado no `LocationInput` e nas temperaturas

---

## ETAPA 12 — Testes E2E

### 12.1 — Happy path

- [ ] Criar `tests/e2e/home.spec.ts`
- [ ] Mock de geolocalização para Rio de Janeiro
- [ ] Verificar: 3 cards renderizados com dados reais

### 12.2 — Troca de localidade

- [ ] Criar `tests/e2e/location.spec.ts`
- [ ] Digitar nova cidade no input → Enter
- [ ] Verificar: cards atualizam com nova localidade

### 12.3 — Toggle de temperatura

- [ ] Criar `tests/e2e/temperature.spec.ts`
- [ ] Clicar em temperatura → verificar mudança para Fahrenheit
- [ ] Clicar novamente → verificar retorno para Celsius

### 12.4 — Responsividade E2E

- [ ] Criar `tests/e2e/responsive.spec.ts`
- [ ] Testar viewport 375px: layout em coluna
- [ ] Testar viewport 1280px: layout em linha (3 colunas)

---

## ETAPA 13 — Documentação Final

### 13.1 — README.md completo

- [ ] Atualizar `README.md` com:
  - Descrição clara do desafio
  - Screenshot ou GIF da aplicação
  - Pré-requisitos
  - Passo a passo Docker (dev e prod)
  - Passo a passo local (sem Docker)
  - Como rodar os testes (unitários, integração, E2E)
  - Variáveis de ambiente

### 13.2 — MELHORIAS.md

- [ ] Criar `docs/MELHORIAS.md` com as melhorias propostas ao layout original
- [ ] Para cada melhoria: descrição + justificativa + impacto esperado na UX

### 13.3 — Limpeza final

- [ ] Remover `console.log` do código de produção
- [ ] Verificar que `.env.example` tem todas as variáveis
- [ ] Rodar `npm run lint` sem erros
- [ ] Confirmar `docker compose --profile dev up` do zero em ambiente limpo
- [ ] Confirmar `docker compose --profile prod up --build` funciona

---

## Resumo das Etapas

| #   | Etapa                      | Tarefas     |
| --- | -------------------------- | ----------- |
| 1   | Setup do Projeto           | 1.1 – 1.7   |
| 2   | Docker                     | 2.1 – 2.4   |
| 3   | Tipos TypeScript           | 3.1 – 3.3   |
| 4   | Utilitários                | 4.1 – 4.8   |
| 5   | Serviços de API            | 5.1 – 5.9   |
| 6   | Custom Hooks               | 6.1 – 6.6   |
| 7   | Sistema de Design          | 7.1 – 7.2   |
| 8   | Componentes de UI          | 8.1 – 8.11  |
| 9   | Página Principal           | 9.1 – 9.2   |
| 10  | Ícones Meteocons           | 10.1        |
| 11  | Responsividade e Polimento | 11.1 – 11.4 |
| 12  | Testes E2E                 | 12.1 – 12.4 |
| 13  | Documentação Final         | 13.1 – 13.3 |
