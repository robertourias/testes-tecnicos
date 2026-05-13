/**
 * Tipos para dados de previsão do tempo (OpenWeather Forecast API 2.5)
 */

// Resposta bruta da Forecast API 2.5 — item de 3 horas
export interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
    humidity: number;
    temp_kf?: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: { all: number };
  wind: { speed: number; deg: number; gust?: number };
  visibility?: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
  rain?: { '3h': number };
  snow?: { '3h': number };
}

// Resposta bruta completa da Forecast API 2.5
export interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: OpenWeatherForecastItem[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population?: number;
    timezone?: number;
    sunrise?: number;
    sunset?: number;
  };
}

// Tipo normalizado para um dia de previsão (usado pelos componentes)
export interface WeatherDay {
  date: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
}
