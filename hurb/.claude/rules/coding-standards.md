# Padrões de Código — HURB Weather Microsite

## TypeScript

- **Sempre** tipar o retorno de funções explicitamente
- Preferir `interface` para objetos de dados e `type` para unions/aliases
- Nunca usar `any` — usar `unknown` e fazer narrowing quando necessário
- Usar `satisfies` do TS 4.9+ para validar objetos contra tipos sem perder literais

```typescript
// ✅ Correto
interface WeatherDay {
  date: string
  temp: number
  description: string
  icon: string
}

async function getWeatherForecast(location: string): Promise<WeatherDay[]> { ... }

// ❌ Evitar
const getWeather = async (location) => { ... }
```

---

## React / Next.js

- **Componentes:** PascalCase, um componente por arquivo
- **Hooks:** camelCase, prefixo `use`, arquivo separado em `/hooks/`
- **Servidor vs. Cliente:** marcar explicitamente com `'use client'` apenas quando necessário (interatividade, browser APIs)
- **Imports:** ordem → React → Next → libs externas → internos (types → utils → hooks → services → components)
- **Props:** definir interface `NomeDoComponenteProps` no topo do arquivo

```tsx
// ✅ Correto
'use client'

interface WeatherCardProps {
  day: WeatherDay
  unit: 'C' | 'F'
  onUnitToggle: () => void
}

export function WeatherCard({ day, unit, onUnitToggle }: WeatherCardProps) { ... }
```

---

## CSS Modules

- Arquivo de módulo: mesmo nome do componente, extensão `.module.css`
- Classes em camelCase: `.weatherCard`, `.temperatureDisplay`
- Tokens de design centralizados em `/styles/tokens.css` como CSS Variables
- **Nunca** usar `style` inline para layout ou cores (apenas para valores dinâmicos como o gradiente)

```css
/* tokens.css */
:root {
  --color-cold: hsl(210, 70%, 50%);
  --color-warm: hsl(45, 90%, 55%);
  --color-hot: hsl(0, 75%, 55%);
  --color-neutral: hsl(0, 0%, 50%);
}
```

---

## Serviços e API

- Cada API externa tem seu próprio arquivo em `/services/`
- Funções de serviço são **sempre async** e retornam tipos explícitos
- Erros de API são capturados e relançados com mensagem descritiva
- **Nunca** expor chaves de API no client-side — usar `NEXT_PUBLIC_` apenas para chaves seguras

```typescript
// services/openweather.ts
export async function getWeatherForecast(location: string): Promise<WeatherDay[]> {
  const res = await fetch(`${BASE_URL}?q=${location}&APPID=${API_KEY}&units=metric`)
  if (!res.ok) throw new Error(`Falha ao buscar previsão para "${location}"`)
  const data = await res.json()
  return parseWeatherResponse(data)
}
```

---

## Git e Commits

Seguir **Conventional Commits** em português:

```
feat: adiciona toggle de temperatura Celsius/Fahrenheit
fix: corrige cor do degradê para temperaturas negativas
test: adiciona testes unitários para getGradientColor
docs: atualiza README com instruções de Docker
chore: configura ESLint e Prettier
refactor: extrai lógica de mapeamento de ícones para utilitário
```

---

## Qualidade de Código

- Rodar `npm run lint` antes de commitar
- Sem `console.log` em código de produção — usar comentários `// TODO:` para debug temporário
- Funções com mais de 40 linhas devem ser refatoradas
- Evitar nested ternaries — usar early returns ou variáveis descritivas
