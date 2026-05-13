/**
 * Testes do serviço OpenWeather (One Call API 3.0 + Geocoding API)
 */
import { geocodeCity, getWeatherForecastByCoords, getWeatherForecast } from '../openweather';
import { mockWeatherResponse, mockGeocodingResponse } from '@/__mocks__/data/weather';

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

describe('geocodeCity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna o primeiro resultado de geocodificação', async () => {
    mockFetchOk(mockGeocodingResponse);

    const result = await geocodeCity('Rio de Janeiro');

    expect(result.name).toBe('Rio de Janeiro');
    expect(result.lat).toBe(-22.9068);
    expect(result.lon).toBe(-43.1729);
    expect(result.country).toBe('BR');
  });

  it('lança erro quando cidade não é encontrada (array vazio)', async () => {
    mockFetchOk([]);

    await expect(geocodeCity('CidadeInexistente')).rejects.toThrow(
      'Localidade "CidadeInexistente" não encontrada'
    );
  });

  it('lança erro quando chave de API é inválida (401)', async () => {
    mockFetchError(401);

    await expect(geocodeCity('Rio de Janeiro')).rejects.toThrow(
      'Chave de API do OpenWeather inválida ou expirada'
    );
  });

  it('lança erro genérico para outros códigos HTTP', async () => {
    mockFetchError(500);

    await expect(geocodeCity('Rio de Janeiro')).rejects.toThrow(
      'Falha ao geocodificar "Rio de Janeiro" (HTTP 500)'
    );
  });

  it('lança erro se o nome da cidade estiver vazio', async () => {
    await expect(geocodeCity('   ')).rejects.toThrow(
      'Nome da localidade não pode ser vazio'
    );
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

  it('extrai descrição e ícone do primeiro item de weather', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecastByCoords(-22.9068, -43.1729);

    forecast.forEach((day) => {
      expect(day.description.length).toBeGreaterThan(0);
      expect(day.icon).toMatch(/^\d{2}[dn]$/); // Formato: 01d, 02n, etc.
    });
  });

  it('usa fallback quando campo weather está vazio', async () => {
    const responseWithEmptyWeather = {
      ...mockWeatherResponse,
      daily: [
        {
          ...mockWeatherResponse.daily[0],
          weather: [],
        },
        ...mockWeatherResponse.daily.slice(1),
      ],
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

  it('usa temperatura do meio-dia (temp.day)', async () => {
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecastByCoords(-22.9068, -43.1729);

    // Dia 0: temp.day = 28.5 → arredondado = 29 (Math.round(28.5) = 29 em JS)
    expect(forecast[0].temp).toBe(Math.round(mockWeatherResponse.daily[0].temp.day));
    // Dia 2: temp.day = 30.0 → 30
    expect(forecast[2].temp).toBe(Math.round(mockWeatherResponse.daily[2].temp.day));
  });
});

describe('getWeatherForecast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('orquestra geocoding + one call e retorna 3 dias', async () => {
    // Primeiro fetch: geocoding
    mockFetchOk(mockGeocodingResponse);
    // Segundo fetch: one call
    mockFetchOk(mockWeatherResponse);

    const forecast = await getWeatherForecast('Rio de Janeiro');

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(forecast).toHaveLength(3);
  });

  it('propaga erro de geocoding quando cidade não é encontrada', async () => {
    mockFetchOk([]);

    await expect(getWeatherForecast('CidadeInexistente')).rejects.toThrow(
      'Localidade "CidadeInexistente" não encontrada'
    );
    // One Call não deve ser chamado se geocoding falhou
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('propaga erro de one call quando geocoding tem sucesso mas previsão falha', async () => {
    mockFetchOk(mockGeocodingResponse);
    mockFetchError(500);

    await expect(getWeatherForecast('Rio de Janeiro')).rejects.toThrow('HTTP 500');
  });

  it('repassa coordenadas corretas do geocoding para o one call', async () => {
    mockFetchOk(mockGeocodingResponse);
    mockFetchOk(mockWeatherResponse);

    await getWeatherForecast('Rio de Janeiro');

    const oneCallCall = (global.fetch as jest.Mock).mock.calls[1][0] as string;

    expect(oneCallCall).toContain('lat=-22.9068');
    expect(oneCallCall).toContain('lon=-43.1729');
    expect(oneCallCall).toContain('exclude=minutely%2Chourly%2Calerts');
  });
});
