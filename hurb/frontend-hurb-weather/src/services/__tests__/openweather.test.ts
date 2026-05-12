/**
 * Testes do serviço OpenWeather
 */
import { getWeatherForecast } from '../openweather';
import { mockWeatherResponse } from '@/__mocks__/data/weather';

// Mock do fetch global
global.fetch = jest.fn();

describe('getWeatherForecast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna 3 dias de previsão corretamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    });

    const forecast = await getWeatherForecast('Rio de Janeiro');

    expect(forecast).toHaveLength(3);

    // Verificar estrutura de cada dia
    forecast.forEach((day) => {
      expect(day).toHaveProperty('date');
      expect(day).toHaveProperty('temp');
      expect(day).toHaveProperty('feelsLike');
      expect(day).toHaveProperty('description');
      expect(day).toHaveProperty('icon');

      // Validar tipos
      expect(typeof day.date).toBe('string');
      expect(typeof day.temp).toBe('number');
      expect(typeof day.feelsLike).toBe('number');
      expect(typeof day.description).toBe('string');
      expect(typeof day.icon).toBe('string');
    });
  });

  it('normaliza temperaturas para números inteiros', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    });

    const forecast = await getWeatherForecast('Rio de Janeiro');

    forecast.forEach((day) => {
      // Temperatura deve ser inteira (sem casas decimais)
      expect(Number.isInteger(day.temp)).toBe(true);
      expect(Number.isInteger(day.feelsLike)).toBe(true);
    });
  });

  it('lança erro quando localidade não é encontrada (404)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getWeatherForecast('LocalidadeInexistente')).rejects.toThrow(
      'Localidade "LocalidadeInexistente" não encontrada'
    );
  });

  it('lança erro quando chave de API é inválida (401)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    await expect(getWeatherForecast('Rio de Janeiro')).rejects.toThrow(
      'Chave de API do OpenWeather inválida ou expirada'
    );
  });

  it('lança erro genérico para outros códigos HTTP', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(getWeatherForecast('Rio de Janeiro')).rejects.toThrow(
      'Falha ao buscar previsão para "Rio de Janeiro" (HTTP 500)'
    );
  });

  it('extrai descrição e ícone do primeiro item de weather', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    });

    const forecast = await getWeatherForecast('Rio de Janeiro');

    forecast.forEach((day) => {
      expect(day.description).toBeTruthy();
      expect(day.description.length).toBeGreaterThan(0);
      expect(day.icon).toMatch(/^\d{2}[dn]$/); // Formato: 01d, 02n, etc.
    });
  });
});
