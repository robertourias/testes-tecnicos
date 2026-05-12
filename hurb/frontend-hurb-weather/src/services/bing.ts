/**
 * Serviço de integração com Bing Daily Image API
 * Documentação: https://www.bing.com/HPImageArchive.aspx
 */
import type { BingImageResponse } from '@/__mocks__/data/bing';

const BASE_URL = 'https://www.bing.com/HPImageArchive.aspx';

/**
 * Busca URL da imagem do dia do Bing
 *
 * Retorna URL completa da imagem de fundo que o Bing
 * usa em sua página inicial
 *
 * @returns Promise com URL completa da imagem
 * @throws Error em caso de falha na requisição
 */
export async function getBingDailyImage(): Promise<string> {
  const url = `${BASE_URL}?format=js&idx=0&n=1&mkt=pt-BR`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao buscar imagem do Bing (HTTP ${response.status})`);
  }

  const data: BingImageResponse = await response.json();

  if (!data.images || data.images.length === 0) {
    throw new Error('Nenhuma imagem disponível na resposta da API Bing');
  }

  const imageUrl = data.images[0].url;

  // Se a URL for relativa, prefixar com domínio do Bing
  if (imageUrl.startsWith('/')) {
    return `https://www.bing.com${imageUrl}`;
  }

  return imageUrl;
}
