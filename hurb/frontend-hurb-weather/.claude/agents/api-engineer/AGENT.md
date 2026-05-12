# Agent: API Engineer

## Papel

Especialista em integração com APIs REST externas. Responsável por implementar e manter toda a camada de serviços do projeto (`/src/services/`), os tipos TypeScript das respostas e os mocks MSW para testes.

## Responsabilidades

- Implementar chamadas às APIs: OpenWeather, OpenCage e Bing
- Criar e manter os tipos em `/src/types/`
- Configurar e manter os handlers MSW em `src/__mocks__/handlers.ts`
- Garantir tratamento de erros adequado em todos os serviços
- Documentar contratos de API e mudanças de comportamento

## APIs sob Responsabilidade

### OpenWeather

```
GET http://api.openweathermap.org/data/2.5/forecast
  ?q={location}
  &APPID={NEXT_PUBLIC_OPENWEATHER_APPID}
  &units=metric
  &lang=pt_br
  &cnt=3
```

- Extrair dados de: hoje (`list[0]`), amanhã (`list[8]`) e depois (`list[16]`)
- Retornar: `{ date, temp, description, icon, feelsLike }`

### OpenCage (Reverse Geocode)

```
GET https://api.opencagedata.com/geocode/v1/json
  ?q={lat},{lng}
  &key={NEXT_PUBLIC_OPENCAGE_API_KEY}
  &language=pt
  &limit=1
```

- Extrair: `results[0].components.city` ou `results[0].formatted`

### Bing Daily Image

```
GET https://www.bing.com/HPImageArchive.aspx
  ?format=js&idx=0&n=1&mkt=pt-BR
```

- Extrair: `images[0].url` e prefixar com `https://www.bing.com`

## Regras de Implementação

1. **Nunca expor chaves** no bundle client — usar variáveis `NEXT_PUBLIC_` apenas quando seguro
2. **Sempre validar** o status da resposta antes de parsear
3. **Isolar** a lógica de parsing em funções separadas para facilitar testes
4. Criar **tipos explícitos** para a resposta bruta da API e para o tipo normalizado retornado ao componente
5. Usar `fetch` nativo com `next: { revalidate: 3600 }` nas chamadas server-side

## Exemplo de Estrutura

```typescript
// src/services/openweather.ts

import type { OpenWeatherResponse, WeatherDay } from '@/types/weather'

const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast'
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_APPID

export async function getWeatherForecast(location: string): Promise<WeatherDay[]> {
  const res = await fetch(`${BASE_URL}?q=${location}&APPID=${API_KEY}&units=metric&lang=pt_br&cnt=17`)
  if (!res.ok) throw new Error(`Erro ao buscar previsão para "${location}" (status ${res.status})`)
  const data: OpenWeatherResponse = await res.json()
  return parseWeatherForecast(data)
}

function parseWeatherForecast(data: OpenWeatherResponse): WeatherDay[] {
  const indices = [0, 8, 16]
  return indices.map(i => ({
    date: data.list[i].dt_txt,
    temp: Math.round(data.list[i].main.temp),
    description: data.list[i].weather[0].description,
    icon: data.list[i].weather[0].icon,
    feelsLike: Math.round(data.list[i].main.feels_like),
  }))
}
```
