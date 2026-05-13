/**
 * Tipos para dados de previsão do tempo (OpenWeather One Call API 3.0)
 */

// Resposta bruta da One Call API 3.0 — item diário
export interface OneCallDailyItem {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary?: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

// Resposta bruta da One Call API 3.0
export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: Record<string, unknown>;
  minutely?: unknown[];
  hourly?: unknown[];
  alerts?: unknown[];
  daily: OneCallDailyItem[];
}

// Resposta bruta da Geocoding API (cidade → coordenadas)
export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
}

// Tipo normalizado para um dia de previsão (usado pelos componentes)
export interface WeatherDay {
  date: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
}
