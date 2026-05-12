# Skill: API Integration

## Descrição

Workflow para implementar um novo serviço de API externa no projeto, seguindo os padrões estabelecidos. Use esta skill sempre que precisar adicionar ou modificar uma chamada de API.

## Gatilho

Usar quando:
- Adicionar uma nova chamada de API
- Modificar parâmetros de uma API existente
- Atualizar a estrutura de dados retornada por um serviço

## Passos

### 1. Definir Tipos (TypeScript)

Criar ou atualizar em `src/types/`:

```typescript
// src/types/weather.ts

/** Resposta bruta da API OpenWeather */
export interface OpenWeatherResponse {
  list: Array<{
    dt_txt: string
    main: {
      temp: number
      feels_like: number
      humidity: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
  }>
  city: {
    name: string
    country: string
  }
}

/** Tipo normalizado usado pela aplicação */
export interface WeatherDay {
  date: string
  temp: number
  feelsLike: number
  description: string
  icon: string
}
```

### 2. Implementar o Serviço

Criar em `src/services/<nome-da-api>.ts`:

```typescript
import type { OpenWeatherResponse, WeatherDay } from '@/types/weather'

const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast'
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_APPID

export async function getWeatherForecast(location: string): Promise<WeatherDay[]> {
  const url = `${BASE_URL}?q=${encodeURIComponent(location)}&APPID=${API_KEY}&units=metric&lang=pt_br&cnt=17`
  
  const res = await fetch(url)
  
  if (!res.ok) {
    throw new Error(`Falha ao buscar previsão para "${location}" (HTTP ${res.status})`)
  }
  
  const data: OpenWeatherResponse = await res.json()
  return parseWeatherForecast(data)
}

function parseWeatherForecast(data: OpenWeatherResponse): WeatherDay[] {
  const indices = [0, 8, 16]
  return indices.map(i => ({
    date: data.list[i].dt_txt,
    temp: Math.round(data.list[i].main.temp),
    feelsLike: Math.round(data.list[i].main.feels_like),
    description: data.list[i].weather[0].description,
    icon: data.list[i].weather[0].icon,
  }))
}
```

### 3. Criar Handler MSW

Adicionar em `src/__mocks__/handlers.ts`:

```typescript
http.get(`${BASE_URL}*`, () => {
  return HttpResponse.json(mockWeatherResponse)
}),
```

Criar dados mock em `src/__mocks__/data/weather.ts`:
- Incluir pelo menos 17 itens na propriedade `list`
- Cobrir diferentes condições climáticas nos dados

### 4. Criar Testes

```typescript
// __tests__/unit/openweather.test.ts
import { getWeatherForecast } from '@/services/openweather'
import { server } from '@/__mocks__/server'
import { http, HttpResponse } from 'msw'

describe('getWeatherForecast', () => {
  it('retorna array de 3 dias de previsão', async () => {
    const result = await getWeatherForecast('Rio de Janeiro')
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({
      date: expect.any(String),
      temp: expect.any(Number),
      description: expect.any(String),
      icon: expect.any(String),
    })
  })

  it('lança erro quando a API retorna status de erro', async () => {
    server.use(
      http.get('http://api.openweathermap.org/*', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )
    await expect(getWeatherForecast('Cidade Inexistente')).rejects.toThrow()
  })
})
```

### 5. Verificação Final

- [ ] Tipo da resposta bruta criado em `/types/`
- [ ] Tipo normalizado criado em `/types/`
- [ ] Função de serviço com retorno tipado
- [ ] Parsing isolado em função separada
- [ ] Handler MSW criado
- [ ] Dados mock criados
- [ ] Testes unitários passando
- [ ] Variável de ambiente documentada no `.env.example`
