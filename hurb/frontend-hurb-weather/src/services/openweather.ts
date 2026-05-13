/**
 * Serviço de integração com OpenWeather APIs
 *
 * - One Call API 3.0: previsão diária por coordenadas
 * - Geocoding API: conversão de nome de cidade em lat/lon
 *
 * Documentação One Call 3.0: https://openweathermap.org/api/one-call-3
 * Documentação Geocoding:    https://openweathermap.org/api/geocoding-api
 */
import type { OneCallResponse, GeocodingResult, WeatherDay } from '@/types/weather';

const ONE_CALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const API_KEY = process.env.OPENWEATHER_APPID ?? process.env.NEXT_PUBLIC_OPENWEATHER_APPID;

// Quantidade de dias de previsão retornados pela função pública
const FORECAST_DAYS = 3;

/**
 * Converte nome de cidade em coordenadas geográficas
 * usando a Geocoding API do OpenWeather
 *
 * @param cityName - Nome da cidade (ex: "Rio de Janeiro")
 * @returns Primeiro resultado de geocodificação encontrado
 * @throws Error se a cidade não for encontrada ou a chave for inválida
 */
export async function geocodeCity(cityName: string): Promise<GeocodingResult> {
  if (!API_KEY) {
    throw new Error('Chave de API do OpenWeather não configurada');
  }

  if (!cityName.trim()) {
    throw new Error('Nome da localidade não pode ser vazio');
  }

  const url = `${GEO_URL}?q=${encodeURIComponent(cityName.trim())}&limit=1&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Chave de API do OpenWeather inválida ou expirada');
    }
    throw new Error(
      `Falha ao geocodificar "${cityName}" (HTTP ${response.status})`
    );
  }

  const data: GeocodingResult[] = await response.json();

  if (data.length === 0) {
    throw new Error(`Localidade "${cityName}" não encontrada`);
  }

  return data[0];
}

/**
 * Busca previsão do tempo pelos próximos dias usando coordenadas geográficas
 * via One Call API 3.0 do OpenWeather
 *
 * Retorna os primeiros FORECAST_DAYS (3) dias do array `daily`
 *
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Array de WeatherDay normalizados
 * @throws Error em caso de falha na requisição
 */
export async function getWeatherForecastByCoords(
  lat: number,
  lon: number
): Promise<WeatherDay[]> {
  if (!API_KEY) {
    throw new Error('Chave de API do OpenWeather não configurada');
  }

  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    appid: API_KEY,
    units: 'metric',
    lang: 'pt_br',
    exclude: 'minutely,hourly,alerts',
  });

  const response = await fetch(`${ONE_CALL_URL}?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Chave de API do OpenWeather inválida ou expirada');
    }
    throw new Error(
      `Falha ao buscar previsão para coordenadas (${lat}, ${lon}) (HTTP ${response.status})`
    );
  }

  const data: OneCallResponse = await response.json();

  return parseDailyForecast(data.daily);
}

/**
 * Busca previsão do tempo por nome de cidade
 * Orquestra: geocodeCity → getWeatherForecastByCoords
 *
 * Interface pública de alto nível mantida para compatibilidade
 *
 * @param location - Nome da cidade (ex: "Rio de Janeiro")
 * @returns Array de WeatherDay normalizados
 * @throws Error em caso de falha em qualquer etapa
 */
export async function getWeatherForecast(location: string): Promise<WeatherDay[]> {
  const geoResult = await geocodeCity(location);
  return getWeatherForecastByCoords(geoResult.lat, geoResult.lon);
}

/**
 * Converte array de OneCallDailyItem para WeatherDay normalizado
 * Usa componentes locais do timestamp para evitar shift de timezone
 *
 * @param daily - Array bruto de dias da One Call API
 * @returns Array de WeatherDay (limitado a FORECAST_DAYS)
 */
function parseDailyForecast(
  daily: OneCallResponse['daily']
): WeatherDay[] {
  return daily.slice(0, FORECAST_DAYS).map(parseDailyItem);
}

/**
 * Converte um OneCallDailyItem em WeatherDay normalizado
 *
 * @param item - Item diário da One Call API
 * @returns WeatherDay com data formatada e temperaturas arredondadas
 */
function parseDailyItem(item: OneCallResponse['daily'][number]): WeatherDay {
  const date = new Date(item.dt * 1000);

  // Usar componentes locais para evitar shift de timezone (compatível com formatWeatherDate)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d} 12:00:00`;

  return {
    date: dateStr,
    temp: Math.round(item.temp.day),
    feelsLike: Math.round(item.feels_like.day),
    description: item.weather[0]?.description ?? 'Sem informações',
    icon: item.weather[0]?.icon ?? '01d',
  };
}
