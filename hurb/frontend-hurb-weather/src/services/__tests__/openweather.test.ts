/**
 * Testes do serviço OpenWeather (Forecast API 2.5)
 */
import { getWeatherForecast, getWeatherForecastByCoords } from '../openweather';
import { mockWeatherResponse } from '@/__mocks__/data/weather';

// Mock do fetch global
global.fetch = jest.fn();

// Helper para montar resposta de fetch bem-sucedida
function mockFetchOk(body: unknown): void {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => body,
  });
}

// Helper para montar resposta de fetch com erro HTTP
function mockFetchError(status: number): void {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status,
  });
}

describe('getWeatherForecast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna exatamente 3 dias de previsão', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    expect(forecast).toHaveLength(3);
  });

  it('retorna WeatherDay com todos os campos tipados corretamente', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    forecast.forEach((day) => {
      expect(typeof day.date).toBe('string');
      expect(typeof day.temp).toBe('number');
      expect(typeof day.feelsLike).toBe('number');
      expect(typeof day.description).toBe('string');
      expect(typeof day.icon).toBe('string');
    });
  });

  it('normaliza temperaturas para números inteiros', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    forecast.forEach((day) => {
      expect(Number.isInteger(day.temp)).toBe(true);
      expect(Number.isInteger(day.feelsLike)).toBe(true);
    });
  });

  it('formata data no padrão YYYY-MM-DD 12:00:00', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    forecast.forEach((day) => {
      expect(day.date).toMatch(/^\d{4}-\d{2}-\d{2} 12:00:00$/);
    });
  });

  it('seleciona item mais próximo do meio-dia de cada dia', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    // Dia 0: item de 12h tem temp=28.5 → arredondado = 29 (Math.round(28.5) em JS)
    // Dia 0: item de 12h tem feels_like=30.2 → arredondado = 30
    expect(forecast[0].temp).toBe(29);
    expect(forecast[0].feelsLike).toBe(30);

    // Dia 1: item de 12h tem temp=27.5 → 28
    expect(forecast[1].temp).toBe(28);

    // Dia 2: item de 12h tem temp=30.0 → 30
    expect(forecast[2].temp).toBe(30);
  });

  it('extrai descrição e ícone do primeiro item de weather', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    forecast.forEach((day) => {
      expect(day.description.length).toBeGreaterThan(0);
      expect(day.icon).toMatch(/^\d{2}[dn]$/); // Formato: 01d, 02n, etc.
    });
  });

  it('usa fallback quando campo weather está vazio no item selecionado', async () => {
    // Cria cópia do mock com weather vazio no item de 12h do dia 0 (índice 4)
    const responseWithEmptyWeather = {
      ...mockWeatherResponse,
      list: mockWeatherResponse.list.map((item, index) =>
        index === 4 ? { ...item, weather: [] } : item
      ),
    };

    mockFetchOk(responseWithEmptyWeather);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    expect(forecast[0].description).toBe('Sem informações');
    expect(forecast[0].icon).toBe('01d');
  });

  it('lança erro se localidade estiver vazia', async () => {
    await expect(getWeatherForecast('   ')).rejects.toThrow(
      'Nome da localidade não pode ser vazio'
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('lança erro quando chave de API é inválida (401)', async () => {
    mockFetchError(401);

    await expect(getWeatherForecast('Rio de Janeiro')).rejects.toThrow(
      'Chave de API do OpenWeather inválida ou expirada'
    );
  });

  it('lança erro quando cidade não é encontrada (404)', async () => {
    mockFetchError(404);

    await expect(getWeatherForecast('CidadeInexistente')).rejects.toThrow(
      'Localidade "CidadeInexistente" não encontrada'
    );
  });

  it('lança erro genérico para outros códigos HTTP', async () => {
    mockFetchError(500);

    await expect(getWeatherForecast('Rio de Janeiro')).rejects.toThrow(
      'Falha ao buscar previsão para "Rio de Janeiro" (HTTP 500)'
    );
  });

  it('inclui o parâmetro q na URL da requisição', async () => {
    mockFetchOk(mockWeatherResponse);

    await getWeatherForecast('São Paulo');

    const callUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(callUrl).toContain('q=S%C3%A3o+Paulo');
    expect(callUrl).toContain('units=metric');
    expect(callUrl).toContain('lang=pt_br');
  });

  it('faz exatamente uma requisição HTTP', async () => {
    mockFetchOk(mockWeatherResponse);

    await getWeatherForecast('Rio de Janeiro');

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe('getWeatherForecastByCoords', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna exatamente 3 dias de previsão', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecastByCoords(-22.9068, -43.1729);

    expect(forecast).toHaveLength(3);
  });

  it('retorna WeatherDay com todos os campos tipados corretamente', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecastByCoords(-22.9068, -43.1729);

    forecast.forEach((day) => {
      expect(typeof day.date).toBe('string');
      expect(typeof day.temp).toBe('number');
      expect(typeof day.feelsLike).toBe('number');
      expect(typeof day.description).toBe('string');
      expect(typeof day.icon).toBe('string');
    });
  });

  it('normaliza temperaturas para números inteiros', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecastByCoords(-22.9068, -43.1729);

    forecast.forEach((day) => {
      expect(Number.isInteger(day.temp)).toBe(true);
      expect(Number.isInteger(day.feelsLike)).toBe(true);
    });
  });

  it('formata data no padrão YYYY-MM-DD 12:00:00', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecastByCoords(-22.9068, -43.1729);

    forecast.forEach((day) => {
      expect(day.date).toMatch(/^\d{4}-\d{2}-\d{2} 12:00:00$/);
    });
  });

  it('usa fallback quando campo weather está vazio no item selecionado', async () => {
    const responseWithEmptyWeather = {
      ...mockWeatherResponse,
      list: mockWeatherResponse.list.map((item, index) =>
        index === 4 ? { ...item, weather: [] } : item
      ),
    };

    mockFetchOk(responseWithEmptyWeather);

    const forecast = await getWeatherForecastByCoords(-22.9068, -43.1729);

    expect(forecast[0].description).toBe('Sem informações');
    expect(forecast[0].icon).toBe('01d');
  });

  it('lança erro quando chave de API é inválida (401)', async () => {
    mockFetchError(401);

    await expect(getWeatherForecastByCoords(-22.9068, -43.1729)).rejects.toThrow(
      'Chave de API do OpenWeather inválida ou expirada'
    );
  });

  it('lança erro genérico para outros códigos HTTP', async () => {
    mockFetchError(500);

    await expect(getWeatherForecastByCoords(-22.9068, -43.1729)).rejects.toThrow(
      'Falha ao buscar previsão para coordenadas (-22.9068, -43.1729) (HTTP 500)'
    );
  });

  it('inclui lat e lon na URL da requisição', async () => {
    mockFetchOk(mockWeatherResponse);

    await getWeatherForecastByCoords(-22.9068, -43.1729);

    const callUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(callUrl).toContain('lat=-22.9068');
    expect(callUrl).toContain('lon=-43.1729');
    expect(callUrl).toContain('units=metric');
    expect(callUrl).toContain('lang=pt_br');
  });

  it('faz exatamente uma requisição HTTP', async () => {
    mockFetchOk(mockWeatherResponse);

    await getWeatherForecastByCoords(-22.9068, -43.1729);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
