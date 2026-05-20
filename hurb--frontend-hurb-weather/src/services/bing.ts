import type { BingImageResponse } from '@/__mocks__/data/bing';

/**
 * Busca URL da imagem do dia do Bing via proxy server-side.
 *
 * A chamada direta ao Bing é bloqueada por CORS no browser.
 * O proxy em /api/bing-image faz a requisição no servidor e repassa o resultado.
 */
export async function getBingDailyImage(): Promise<string> {
  const response = await fetch('/api/bing-image');

  if (!response.ok) {
    throw new Error(`Falha ao buscar imagem do Bing (HTTP ${response.status})`);
  }

  const data: BingImageResponse = await response.json();

  if (!data.images || data.images.length === 0) {
    throw new Error('Nenhuma imagem disponível na resposta da API Bing');
  }

  const imageUrl = data.images[0].url;

  if (imageUrl.startsWith('/')) {
    return `https://www.bing.com${imageUrl}`;
  }

  return imageUrl;
}
