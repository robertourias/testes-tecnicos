# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

---

## [0.6.0] - 2026-05-12

### ✨ Adicionado

- `src/hooks/useGeolocation.ts` — hook para geolocalização via `navigator.geolocation.getCurrentPosition`, retorna `{ coordinates, error, loading }`; trata permissão negada, timeout e API indisponível
- `src/hooks/useTemperatureUnit.ts` — hook para toggle de unidade de temperatura `'C' ↔ 'F'`, retorna `{ unit, toggleUnit }` com callback memoizado via `useCallback`
- `src/hooks/useWeather.ts` — hook principal que orquestra geolocalização → reverse geocode → previsão do tempo; busca imagem do Bing em paralelo via `Promise.all`; expõe `setLocation` para troca manual de localidade
- `src/hooks/__tests__/useGeolocation.test.tsx` — 6 testes: loading inicial, coordenadas retornadas, erro de permissão, erro de timeout, posição indisponível, geolocation ausente
- `src/hooks/__tests__/useTemperatureUnit.test.tsx` — 4 testes: estado inicial `'C'`, toggle C→F, toggle F→C, estabilidade do callback
- `src/hooks/__tests__/useWeather.test.tsx` — 6 testes: fluxo completo, chamada com coordenadas corretas, Bing em paralelo, `setLocation`, erro de geolocalização, erro da API de previsão

### 🔧 Configurado

- `jest.config.ts` — adicionado `rettime` ao `transformIgnorePatterns` para compatibilidade com dependências ESM transitivas do MSW

### 📊 Métricas

- 17 novos testes de hooks (todos passando)
- Total da suíte: 85 testes em 10 suítes (0 falhas)

### ✅ Validado

- ✅ `npm run test` — 85 testes passando
- ✅ Fluxo completo de hooks: `useGeolocation` → `useWeather` → `useTemperatureUnit`
- ✅ Todos os casos de erro cobertos (permissão negada, timeout, API falha, geocode falha)

---

## [0.5.0] - 2026-05-12

### ✨ Adicionado

- `src/services/openweather.ts` — serviço para buscar previsão de 3 dias (hoje/amanhã/depois) com agrupamento por dia e seleção do item mais próximo do meio-dia
- `src/services/opencage.ts` — serviço de reverse geocode com fallback `city → town → village → municipality → formatted`
- `src/services/bing.ts` — serviço para buscar URL da imagem diária do Bing com prefixação automática de URL relativa
- `src/__mocks__/data/weather.ts` — 17 itens de previsão simulada para Rio de Janeiro
- `src/__mocks__/data/geocode.ts` — resposta simulada de geocodificação reversa para Rio de Janeiro
- `src/__mocks__/data/bing.ts` — resposta simulada da API Bing
- `src/__mocks__/handlers.ts` — handlers MSW para as 3 APIs externas
- Testes unitários dos 3 serviços (mock de `fetch` global)

### 📊 Métricas

- 68 testes totais (0 falhas)

---

## [0.4.0] - 2026-05-12

### ✨ Adicionado

- `src/utils/temperature.ts` — `celsiusToFahrenheit`, `fahrenheitToCelsius`, `formatTemperature`
- `src/utils/gradient.ts` — `getGradientTheme` (null→neutral, <15→cold, 15-35→warm, >35→hot)
- `src/utils/icons.ts` — `getMeteoconIcon` mapeando códigos OpenWeather para arquivos de ícone Meteocon
- `src/utils/date.ts` — `formatWeatherDate` retornando 'Hoje', 'Amanhã', 'Depois de amanhã'
- Testes unitários para todos os utilitários (temperatura, gradiente, ícones, data)

---

## [0.3.0] - 2026-05-12

### ✨ Adicionado

- `src/types/weather.ts` — `OpenWeatherResponse`, `OpenWeatherForecastItem`, `WeatherDay`
- `src/types/geocode.ts` — `OpenCageResponse`, `OpenCageResult`, `Coordinates`
- `src/types/ui.ts` — `TemperatureUnit`, `GradientTheme`
- `src/types/index.ts` — re-exports centralizados

---

## [0.2.0] - 2026-05-12

### ✨ Adicionado

- `Dockerfile` multi-stage: `base`, `development`, `builder`, `production`
- `docker-compose.yml` com perfis `dev` e `prod`
- `.dockerignore` otimizado
- `next.config.ts` com `output: 'standalone'` e `remotePatterns` para Bing

---

## [0.1.0] - 2026-05-12

### ✨ Adicionado

- Setup inicial Next.js 14 com TypeScript, App Router, CSS Modules, ESLint
- Estrutura de pastas: `src/app`, `src/components`, `src/hooks`, `src/services`, `src/utils`, `src/types`, `src/styles`
- Configuração Jest + Testing Library + MSW
- Configuração Playwright para testes E2E
- `.env.example` com variáveis de ambiente necessárias
- `src/styles/tokens.css` com variáveis CSS de design
