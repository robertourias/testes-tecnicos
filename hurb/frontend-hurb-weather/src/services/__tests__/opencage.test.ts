/**
 * Testes do serviço OpenCage
 */
import { reverseGeocode } from '../opencage';
import { mockGeocodeResponse } from '@/__mocks__/data/geocode';

// Mock do fetch global
global.fetch = jest.fn();

describe('reverseGeocode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna nome da cidade corretamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockGeocodeResponse,
    });

    const city = await reverseGeocode(-22.9068, -43.1729);

    expect(typeof city).toBe('string');
    expect(city).toBe('Rio de Janeiro');
  });

  it('aceita coordenadas com precisão decimal', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockGeocodeResponse,
    });

    const city = await reverseGeocode(-22.906847, -43.172896);

    expect(typeof city).toBe('string');
    expect(city.length).toBeGreaterThan(0);
  });

  it('lança erro quando chave de API é inválida (401)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    await expect(reverseGeocode(-22.9068, -43.1729)).rejects.toThrow(
      'Chave de API do OpenCage inválida ou expirada'
    );
  });

  it('lança erro quando chave de API está bloqueada (403)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    await expect(reverseGeocode(-22.9068, -43.1729)).rejects.toThrow(
      'Chave de API do OpenCage inválida ou expirada'
    );
  });

  it('lança erro quando cota de requisições é excedida (402)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 402,
    });

    await expect(reverseGeocode(-22.9068, -43.1729)).rejects.toThrow(
      'Cota de requisições da API OpenCage excedida'
    );
  });

  it('lança erro quando nenhum resultado é encontrado', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [],
        status: { code: 200, message: 'OK' },
      }),
    });

    await expect(reverseGeocode(0, 0)).rejects.toThrow(
      'Nenhuma localidade encontrada para as coordenadas (0, 0)'
    );
  });

  it('lança erro genérico para outros códigos HTTP', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(reverseGeocode(-22.9068, -43.1729)).rejects.toThrow(
      'Falha ao geocodificar coordenadas (HTTP 500)'
    );
  });

  it('usa fallback para town quando city não está disponível', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            components: {
              town: 'Petrópolis',
              'ISO_3166-1_alpha-2': 'BR',
              'ISO_3166-1_alpha-3': 'BRA',
              'ISO_3166-2': ['BR-RJ'],
              _category: 'place',
              _type: 'town',
              continent: 'South America',
              country: 'Brazil',
              country_code: 'br',
              state: 'Rio de Janeiro',
            },
            formatted: 'Petrópolis, RJ, Brazil',
            geometry: { lat: -22.5, lng: -43.2 },
          },
        ],
        status: { code: 200, message: 'OK' },
      }),
    });

    const city = await reverseGeocode(-22.5, -43.2);
    expect(city).toBe('Petrópolis');
  });
});
