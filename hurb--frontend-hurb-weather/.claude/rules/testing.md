# Regras de Testes — HURB Weather Microsite

## Estrutura de Testes

```
/__tests__/
  /unit/          → Testes de funções puras e hooks isolados
  /integration/   → Testes de componentes com APIs mockadas (MSW)
  /e2e/           → Testes end-to-end com Playwright
```

## Ferramentas

| Tipo                  | Ferramenta                    | Config                      |
| --------------------- | ----------------------------- | --------------------------- |
| Unitário / Integração | Jest + @testing-library/react | `jest.config.ts`            |
| Mock de APIs          | MSW (Mock Service Worker)     | `src/__mocks__/handlers.ts` |
| E2E                   | Playwright                    | `playwright.config.ts`      |

---

## Convenções

### Nomenclatura de Arquivos

- Unitários: `nome.test.ts` (sem JSX) ou `nome.test.tsx` (com componente)
- Integração: `nome.integration.test.tsx`
- E2E: `nome.spec.ts`

### Padrão de `describe` / `it`

```typescript
describe('getGradientColor', () => {
  it('retorna tons de cinza quando temperatura é null', () => { ... })
  it('retorna tons de azul para temperatura abaixo de 15°C', () => { ... })
  it('retorna tons de amarelo para temperatura entre 15°C e 35°C', () => { ... })
  it('retorna tons de vermelho para temperatura acima de 35°C', () => { ... })
})
```

- `describe`: nome da função ou componente (camelCase ou PascalCase)
- `it`: frase descritiva em português, começando com verbo no presente

### O Que Testar

**Unitários — sempre testar:**

- Todas as funções em `/utils/` (puras, sem efeitos colaterais)
- Custom hooks com `renderHook` e mocks de dependências externas
- Casos de borda: valores null/undefined, extremos de temperatura

**Integração — sempre testar:**

- Componentes que fazem chamadas de API (via MSW)
- Fluxo: localidade → busca → renderização dos cards
- Estados de loading e erro

**E2E — sempre testar:**

- Happy path completo: abrir página → geolocalização → previsão exibida
- Troca de localidade via input
- Toggle Celsius ↔ Fahrenheit ao clicar na temperatura
- Responsividade nos viewports: 375px (mobile) e 1280px (desktop)

---

## MSW — Mock de APIs

Todos os handlers MSW ficam em `src/__mocks__/handlers.ts`:

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://api.openweathermap.org/*', () => {
    return HttpResponse.json(mockWeatherData);
  }),
  http.get('https://api.opencagedata.com/*', () => {
    return HttpResponse.json(mockGeocodeData);
  }),
];
```

---

## Cobertura Mínima Esperada

- Utilitários (`/utils/`): **90%+**
- Hooks (`/hooks/`): **80%+**
- Serviços (`/services/`): **70%+**
- Componentes (`/components/`): **60%+** (foco no comportamento, não na UI)
