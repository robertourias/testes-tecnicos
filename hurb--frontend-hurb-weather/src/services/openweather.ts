/**
 * Serviço de integração com OpenWeather Forecast API 2.5
 *
 * Busca previsão de 5 dias (intervalos de 3h) por nome de cidade ou coordenadas.
 * Agrupa os itens por dia e seleciona o mais próximo do meio-dia de cada dia,
 * retornando os primeiros 3 dias.
 *
 * Documentação: https://openweathermap.org/forecast5
 */
import type { OpenWeatherForecastResponse, WeatherDay } from '@/types/weather';

const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_APPID;

// Quantidade de dias de previsão retornados
const FORECAST_DAYS = 3;

// Hora alvo para seleção do item representativo de cada dia (meio-dia)
const TARGET_HOUR = 12;

/**
 * Busca previsão do tempo por nome de cidade
 *
 * @param location - Nome da cidade (ex: "Rio de Janeiro", "Campinas,BR")
 * @returns Array de WeatherDay normalizados para os primeiros 3 dias
 * @throws Error se localidade vazia, chave inválida ou cidade não encontrada
 */
export async function getWeatherForecast(location: string): Promise<WeatherDay[]> {
  if (!location.trim()) {
    throw new Error('Nome da localidade não pode ser vazio');
  }

  const params = new URLSearchParams({
    q: location.trim(),
    appid: API_KEY ?? '',
    units: 'metric',
    lang: 'pt_br',
  });

  const response = await fetch(`${FORECAST_URL}?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Chave de API do OpenWeather inválida ou expirada');
    }
    if (response.status === 404) {
      throw new Error(`Localidade "${location}" não encontrada`);
    }
    throw new Error(
      `Falha ao buscar previsão para "${location}" (HTTP ${response.status})`
    );
  }

  const data: OpenWeatherForecastResponse = await response.json();

  return extractThreeDayForecast(data);
}

/**
 * Busca previsão do tempo por coordenadas geográficas
 *
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Array de WeatherDay normalizados para os primeiros 3 dias
 * @throws Error se chave inválida ou falha na requisição
 */
export async function getWeatherForecastByCoords(
  lat: number,
  lon: number
): Promise<WeatherDay[]> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    appid: API_KEY ?? '',
    units: 'metric',
    lang: 'pt_br',
  });

  const response = await fetch(`${FORECAST_URL}?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Chave de API do OpenWeather inválida ou expirada');
    }
    throw new Error(
      `Falha ao buscar previsão para coordenadas (${lat}, ${lon}) (HTTP ${response.status})`
    );
  }

  const data: OpenWeatherForecastResponse = await response.json();

  return extractThreeDayForecast(data);
}

/**
 * Agrupa os itens de 3h por dia e seleciona o mais próximo do meio-dia.
 * Usa componentes locais do timestamp para evitar shift de timezone.
 *
 * @param data - Resposta bruta da Forecast API 2.5
 * @returns Array de WeatherDay (limitado a FORECAST_DAYS)
 */
function extractThreeDayForecast(data: OpenWeatherForecastResponse): WeatherDay[] {
  // Mapa: "YYYY-MM-DD" → item mais próximo do meio-dia
  const dayMap = new Map<string, OpenWeatherForecastResponse['list'][number]>();

  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dayKey = `${y}-${m}-${d}`;

    const existing = dayMap.get(dayKey);

    if (!existing) {
      dayMap.set(dayKey, item);
      continue;
    }

    // Compara qual item está mais próximo de TARGET_HOUR
    const existingHour = new Date(existing.dt * 1000).getHours();
    const currentHour = date.getHours();

    if (
      Math.abs(currentHour - TARGET_HOUR) < Math.abs(existingHour - TARGET_HOUR)
    ) {
      dayMap.set(dayKey, item);
    }
  }

  return Array.from(dayMap.entries())
    .slice(0, FORECAST_DAYS)
    .map(([dayKey, item]) => parseForecastItem(dayKey, item));
}

/**
 * Converte um item bruto da Forecast API em WeatherDay normalizado
 *
 * @param dayKey - Data no formato "YYYY-MM-DD"
 * @param item   - Item bruto da lista de previsões
 * @returns WeatherDay com data no formato "YYYY-MM-DD 12:00:00"
 */
function parseForecastItem(
  dayKey: string,
  item: OpenWeatherForecastResponse['list'][number]
): WeatherDay {
  return {
    date: `${dayKey} 12:00:00`,
    temp: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
    description: item.weather[0]?.description ?? 'Sem informações',
    icon: item.weather[0]?.icon ?? '01d',
  };
}
