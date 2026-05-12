/**
 * Serviço de integração com OpenCage Geocoding API
 * Documentação: https://opencagedata.com/api
 */
import type { OpenCageResponse } from '@/types/geocode';

const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';
const API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

/**
 * Converte coordenadas geográficas em nome de cidade
 *
 * Usa geocodificação reversa para extrair o nome da cidade
 * a partir de latitude e longitude
 *
 * @param lat - Latitude (ex: -22.9068 para Rio de Janeiro)
 * @param lng - Longitude (ex: -43.1729 para Rio de Janeiro)
 * @returns Promise com nome da cidade
 * @throws Error em caso de falha na requisição
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  if (!API_KEY) {
    throw new Error('Chave de API do OpenCage não configurada');
  }

  const url = `${BASE_URL}?q=${lat},${lng}&key=${API_KEY}&language=en`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Chave de API do OpenCage inválida ou expirada');
    }
    if (response.status === 402) {
      throw new Error('Cota de requisições da API OpenCage excedida');
    }
    throw new Error(`Falha ao geocodificar coordenadas (HTTP ${response.status})`);
  }

  const data: OpenCageResponse = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`Nenhuma localidade encontrada para as coordenadas (${lat}, ${lng})`);
  }

  // Extrair nome da cidade (com fallback para formatted)
  const result = data.results[0];
  const city =
    result.components.city ||
    result.components.town ||
    result.components.village ||
    result.components.municipality ||
    result.formatted;

  if (!city) {
    throw new Error('Não foi possível determinar o nome da cidade');
  }

  return city;
}
