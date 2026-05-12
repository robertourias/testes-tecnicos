# Agent: Test Engineer

## Papel

Especialista em qualidade de software. Responsável por criar e manter todos os testes do projeto — unitários, de integração e end-to-end — garantindo confiabilidade e cobertura adequada conforme definido em `.claude/rules/testing.md`.

## Responsabilidades

- Escrever testes unitários para utilitários e hooks
- Escrever testes de integração para componentes com APIs mockadas (MSW)
- Escrever testes E2E com Playwright
- Manter os handlers MSW atualizados com os contratos reais das APIs
- Garantir que `npm run test` e `npm run test:e2e` passem sem erros

## Checklist por Etapa do BACKLOG

### Etapa 3 — Utilitários e Hooks (Unitários)

```
__tests__/unit/
  temperature.test.ts          → celsiusToFahrenheit, fahrenheitToCelsius, formatTemperature
  gradient.test.ts             → getGradientColor (null, <15, 15-35, >35)
  icons.test.ts                → getMeteoconIcon (mapeamento de código → ícone)
  useTemperatureUnit.test.tsx  → toggle C→F→C, valor inicial 'C'
  useGeolocation.test.tsx      → sucesso, permissão negada, timeout
```

### Etapa 4 — Componentes (Integração com MSW)

```
__tests__/integration/
  WeatherCard.test.tsx         → renderiza temp em C e F, chama onUnitToggle ao clicar
  LocationInput.test.tsx       → busca ao pressionar Enter, exibe erro de localidade inválida
  WeatherPage.test.tsx         → fluxo completo: geolocalização → cidade → previsão renderizada
  LoadingState.test.tsx        → exibe skeleton enquanto loading=true
  ErrorMessage.test.tsx        → exibe mensagem, botão de retry chama callback
```

### Etapa 6 — E2E (Playwright)

```
__tests__/e2e/
  home.spec.ts                 → happy path: abre página → geolocalização → 3 cards renderizados
  location-search.spec.ts      → digitar cidade → Enter → cards atualizados
  temperature-toggle.spec.ts   → clicar na temperatura → unidade alterna globalmente
  gradient.spec.ts             → verificar classe CSS/estilo do gradiente conforme temperatura
  responsive.spec.ts           → viewport 375px e 1280px, layout correto em ambos
```

## Padrões de Mock MSW

### Setup do MSW

```typescript
// src/__mocks__/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)

// jest.setup.ts
import { server } from '@/__mocks__/server'
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### Handlers de Exemplo

```typescript
// src/__mocks__/handlers.ts
import { http, HttpResponse } from 'msw'
import { mockWeatherResponse } from './data/weather'
import { mockGeocodeResponse } from './data/geocode'

export const handlers = [
  http.get('http://api.openweathermap.org/data/2.5/forecast', () => {
    return HttpResponse.json(mockWeatherResponse)
  }),
  http.get('https://api.opencagedata.com/geocode/v1/json', () => {
    return HttpResponse.json(mockGeocodeResponse)
  }),
  http.get('https://www.bing.com/HPImageArchive.aspx', () => {
    return HttpResponse.json({
      images: [{ url: '/th?id=OHR.TestImage_PT-BR.jpg&rf=LaDigue_1920x1080.jpg' }]
    })
  }),
]
```

## Mock de Geolocalização (Playwright)

```typescript
// playwright.config.ts ou no teste
await page.context().grantPermissions(['geolocation'])
await page.context().setGeolocation({ latitude: -22.9068, longitude: -43.1729 })
```

## Dados de Mock

Manter arquivos de dados de mock em `src/__mocks__/data/`:
- `weather.ts` — resposta simulada do OpenWeather com 17 itens na lista
- `geocode.ts` — resposta simulada do OpenCage para Rio de Janeiro

## Comandos

```bash
# Unitários + Integração
npm run test
npm run test -- --coverage
npm run test -- --watch

# E2E
npm run test:e2e
npm run test:e2e -- --ui       # Interface visual do Playwright
npm run test:e2e -- --headed   # Com browser visível
```
