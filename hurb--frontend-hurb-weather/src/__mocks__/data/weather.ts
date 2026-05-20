/**
 * Mock de dados da OpenWeather Forecast API 2.5 para testes
 * Simula resposta de previsão de 5 dias (intervalos de 3h) para Rio de Janeiro
 *
 * Timestamps são relativos a Date.now() para cobrir hoje, amanhã e depois de amanhã.
 * Cada dia tem itens às 00:00, 03:00, 06:00, 09:00, 12:00 e 15:00 (6 slots por dia,
 * exceto o terceiro dia que tem apenas 5 slots — total de 17 itens).
 */
import type { OpenWeatherForecastResponse } from '@/types/weather';

// Timestamp do início do dia atual (meia-noite local), em segundos
function getDayStart(offsetDays: number): number {
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offsetDays);
  return Math.floor(dayStart.getTime() / 1000);
}

// Intervalo de 3 horas em segundos
const THREE_HOURS = 3 * 60 * 60;

// Timestamps por dia
const day0 = getDayStart(0); // hoje
const day1 = getDayStart(1); // amanhã
const day2 = getDayStart(2); // depois de amanhã

export const mockWeatherResponse: OpenWeatherForecastResponse = {
  cod: '200',
  message: 0,
  cnt: 17,
  list: [
    // Dia 0 — hoje (6 itens: 00h, 03h, 06h, 09h, 12h, 15h)
    {
      dt: day0 + 0 * THREE_HOURS,
      main: { temp: 22.0, feels_like: 22.5, temp_min: 21.5, temp_max: 23.0, pressure: 1013, humidity: 75, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01n' }],
      clouds: { all: 5 },
      wind: { speed: 3.5, deg: 120 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: `${new Date(day0 * 1000).toISOString().slice(0, 10)} 00:00:00`,
    },
    {
      dt: day0 + 1 * THREE_HOURS,
      main: { temp: 21.5, feels_like: 22.0, temp_min: 21.0, temp_max: 22.5, pressure: 1013, humidity: 76, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01n' }],
      clouds: { all: 5 },
      wind: { speed: 3.0, deg: 118 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: `${new Date(day0 * 1000).toISOString().slice(0, 10)} 03:00:00`,
    },
    {
      dt: day0 + 2 * THREE_HOURS,
      main: { temp: 21.0, feels_like: 21.5, temp_min: 20.5, temp_max: 22.0, pressure: 1014, humidity: 77, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }],
      clouds: { all: 5 },
      wind: { speed: 3.0, deg: 115 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day0 * 1000).toISOString().slice(0, 10)} 06:00:00`,
    },
    {
      dt: day0 + 3 * THREE_HOURS,
      main: { temp: 25.0, feels_like: 26.0, temp_min: 24.0, temp_max: 26.5, pressure: 1013, humidity: 68, temp_kf: 0 },
      weather: [{ id: 801, main: 'Clouds', description: 'poucas nuvens', icon: '02d' }],
      clouds: { all: 20 },
      wind: { speed: 4.0, deg: 120 },
      visibility: 10000,
      pop: 0.05,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day0 * 1000).toISOString().slice(0, 10)} 09:00:00`,
    },
    {
      // Item do meio-dia (mais próximo de 12h) — será selecionado pelo serviço
      dt: day0 + 4 * THREE_HOURS,
      main: { temp: 28.5, feels_like: 30.2, temp_min: 27.0, temp_max: 30.0, pressure: 1012, humidity: 65, temp_kf: 0 },
      weather: [{ id: 801, main: 'Clouds', description: 'poucas nuvens', icon: '02d' }],
      clouds: { all: 20 },
      wind: { speed: 4.5, deg: 120, gust: 6.2 },
      visibility: 10000,
      pop: 0.1,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day0 * 1000).toISOString().slice(0, 10)} 12:00:00`,
    },
    {
      dt: day0 + 5 * THREE_HOURS,
      main: { temp: 27.0, feels_like: 28.5, temp_min: 26.0, temp_max: 28.5, pressure: 1012, humidity: 67, temp_kf: 0 },
      weather: [{ id: 801, main: 'Clouds', description: 'poucas nuvens', icon: '02d' }],
      clouds: { all: 25 },
      wind: { speed: 4.2, deg: 118 },
      visibility: 10000,
      pop: 0.1,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day0 * 1000).toISOString().slice(0, 10)} 15:00:00`,
    },
    // Dia 1 — amanhã (6 itens: 00h, 03h, 06h, 09h, 12h, 15h)
    {
      dt: day1 + 0 * THREE_HOURS,
      main: { temp: 23.0, feels_like: 23.5, temp_min: 22.5, temp_max: 24.0, pressure: 1013, humidity: 72, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01n' }],
      clouds: { all: 5 },
      wind: { speed: 3.5, deg: 115 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: `${new Date(day1 * 1000).toISOString().slice(0, 10)} 00:00:00`,
    },
    {
      dt: day1 + 1 * THREE_HOURS,
      main: { temp: 22.5, feels_like: 23.0, temp_min: 22.0, temp_max: 23.5, pressure: 1014, humidity: 73, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01n' }],
      clouds: { all: 5 },
      wind: { speed: 3.2, deg: 112 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: `${new Date(day1 * 1000).toISOString().slice(0, 10)} 03:00:00`,
    },
    {
      dt: day1 + 2 * THREE_HOURS,
      main: { temp: 22.0, feels_like: 22.5, temp_min: 21.5, temp_max: 23.0, pressure: 1014, humidity: 74, temp_kf: 0 },
      weather: [{ id: 500, main: 'Rain', description: 'chuva leve', icon: '10d' }],
      clouds: { all: 50 },
      wind: { speed: 3.5, deg: 110 },
      visibility: 8000,
      pop: 0.3,
      sys: { pod: 'd' },
      rain: { '3h': 0.4 },
      dt_txt: `${new Date(day1 * 1000).toISOString().slice(0, 10)} 06:00:00`,
    },
    {
      dt: day1 + 3 * THREE_HOURS,
      main: { temp: 25.5, feels_like: 26.5, temp_min: 24.5, temp_max: 27.0, pressure: 1013, humidity: 70, temp_kf: 0 },
      weather: [{ id: 500, main: 'Rain', description: 'chuva leve', icon: '10d' }],
      clouds: { all: 60 },
      wind: { speed: 4.0, deg: 115 },
      visibility: 9000,
      pop: 0.4,
      sys: { pod: 'd' },
      rain: { '3h': 0.8 },
      dt_txt: `${new Date(day1 * 1000).toISOString().slice(0, 10)} 09:00:00`,
    },
    {
      // Item do meio-dia (mais próximo de 12h) — será selecionado pelo serviço
      dt: day1 + 4 * THREE_HOURS,
      main: { temp: 27.5, feels_like: 29.0, temp_min: 26.0, temp_max: 29.0, pressure: 1012, humidity: 68, temp_kf: 0 },
      weather: [{ id: 500, main: 'Rain', description: 'chuva leve', icon: '10d' }],
      clouds: { all: 55 },
      wind: { speed: 4.2, deg: 118, gust: 5.8 },
      visibility: 9000,
      pop: 0.45,
      sys: { pod: 'd' },
      rain: { '3h': 1.2 },
      dt_txt: `${new Date(day1 * 1000).toISOString().slice(0, 10)} 12:00:00`,
    },
    {
      dt: day1 + 5 * THREE_HOURS,
      main: { temp: 26.0, feels_like: 27.5, temp_min: 25.0, temp_max: 27.5, pressure: 1012, humidity: 70, temp_kf: 0 },
      weather: [{ id: 500, main: 'Rain', description: 'chuva leve', icon: '10d' }],
      clouds: { all: 50 },
      wind: { speed: 4.0, deg: 115 },
      visibility: 9000,
      pop: 0.35,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day1 * 1000).toISOString().slice(0, 10)} 15:00:00`,
    },
    // Dia 2 — depois de amanhã (5 itens: 00h, 03h, 06h, 09h, 12h)
    {
      dt: day2 + 0 * THREE_HOURS,
      main: { temp: 24.0, feels_like: 24.5, temp_min: 23.5, temp_max: 25.0, pressure: 1014, humidity: 70, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 3.5, deg: 110 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: `${new Date(day2 * 1000).toISOString().slice(0, 10)} 00:00:00`,
    },
    {
      dt: day2 + 1 * THREE_HOURS,
      main: { temp: 23.5, feels_like: 24.0, temp_min: 23.0, temp_max: 24.5, pressure: 1015, humidity: 71, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 3.2, deg: 108 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: `${new Date(day2 * 1000).toISOString().slice(0, 10)} 03:00:00`,
    },
    {
      dt: day2 + 2 * THREE_HOURS,
      main: { temp: 23.0, feels_like: 23.5, temp_min: 22.5, temp_max: 24.0, pressure: 1015, humidity: 72, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 3.2, deg: 108 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day2 * 1000).toISOString().slice(0, 10)} 06:00:00`,
    },
    {
      dt: day2 + 3 * THREE_HOURS,
      main: { temp: 27.5, feels_like: 29.0, temp_min: 26.5, temp_max: 29.0, pressure: 1014, humidity: 62, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 3.8, deg: 110 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day2 * 1000).toISOString().slice(0, 10)} 09:00:00`,
    },
    {
      // Item do meio-dia (mais próximo de 12h) — será selecionado pelo serviço
      dt: day2 + 4 * THREE_HOURS,
      main: { temp: 30.0, feels_like: 32.5, temp_min: 29.0, temp_max: 32.5, pressure: 1013, humidity: 60, temp_kf: 0 },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 4.0, deg: 110, gust: 5.5 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: `${new Date(day2 * 1000).toISOString().slice(0, 10)} 12:00:00`,
    },
  ],
  city: {
    id: 3451190,
    name: 'Rio de Janeiro',
    coord: { lat: -22.9068, lon: -43.1729 },
    country: 'BR',
    population: 6747815,
    timezone: -10800,
    sunrise: day0 + 6 * 3600,
    sunset: day0 + 18 * 3600,
  },
};
