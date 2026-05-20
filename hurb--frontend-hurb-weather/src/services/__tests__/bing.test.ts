/**
 * Testes do serviço Bing Daily Image
 */
import { getBingDailyImage } from '../bing';
import { mockBingResponse } from '@/__mocks__/data/bing';

// Mock do fetch global
global.fetch = jest.fn();

describe('getBingDailyImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna URL completa da imagem', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBingResponse,
    });

    const imageUrl = await getBingDailyImage();

    expect(typeof imageUrl).toBe('string');
    expect(imageUrl).toMatch(/^https:\/\//);
    expect(imageUrl.length).toBeGreaterThan(0);
  });

  it('prefixa URL relativa com domínio do Bing', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBingResponse,
    });

    const imageUrl = await getBingDailyImage();

    // A URL do mock é relativa e deve ser prefixada
    expect(imageUrl).toMatch(/^https:\/\/www\.bing\.com\//);
  });

  it('retorna URL absoluta quando fornecida pela API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        images: [
          {
            url: 'https://example.com/image.jpg',
            startdate: '20220514',
            fullstartdate: '202205140700',
            enddate: '20220515',
            urlbase: '/th?id=OHR.Example',
            copyright: 'Example Image',
            copyrightlink: 'https://example.com',
            title: 'Example',
            quiz: '',
            wp: true,
            hsh: 'abc123',
            drk: 1,
            top: 1,
            bot: 1,
            hs: [],
          },
        ],
        tooltips: {
          loading: 'Carregando...',
          previous: 'Anterior',
          next: 'Próxima',
          walle: '',
          walls: '',
        },
      }),
    });

    const imageUrl = await getBingDailyImage();
    expect(imageUrl).toBe('https://example.com/image.jpg');
  });

  it('lança erro quando requisição falha', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(getBingDailyImage()).rejects.toThrow('Falha ao buscar imagem do Bing (HTTP 500)');
  });

  it('lança erro quando nenhuma imagem está disponível', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        images: [],
        tooltips: {
          loading: 'Carregando...',
          previous: 'Anterior',
          next: 'Próxima',
          walle: '',
          walls: '',
        },
      }),
    });

    await expect(getBingDailyImage()).rejects.toThrow(
      'Nenhuma imagem disponível na resposta da API Bing'
    );
  });

  it('lança erro quando array de imagens não existe', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tooltips: {
          loading: 'Carregando...',
          previous: 'Anterior',
          next: 'Próxima',
          walle: '',
          walls: '',
        },
      }),
    });

    await expect(getBingDailyImage()).rejects.toThrow(
      'Nenhuma imagem disponível na resposta da API Bing'
    );
  });
});
