import { http, HttpResponse } from 'msw';
import { mockWeatherResponse } from './data/weather';
import { mockGeocodeResponse } from './data/geocode';
import { mockBingResponse } from './data/bing';

export const handlers: Array<ReturnType<typeof http.get | typeof http.post>> = [
  // OpenWeather Forecast API 2.5 — previsão por nome de cidade ou coordenadas
  http.get('https://api.openweathermap.org/data/2.5/forecast', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? '';

    // Simula cidade inválida retornando 404
    if (query.toUpperCase() === 'INVALID') {
      return HttpResponse.json({ cod: '404', message: 'city not found' }, { status: 404 });
    }

    // Simula chave de API inválida
    if (url.searchParams.get('appid') === 'INVALID_KEY') {
      return HttpResponse.json({ cod: 401, message: 'Invalid API key.' }, { status: 401 });
    }

    return HttpResponse.json(mockWeatherResponse);
  }),

  // OpenCage Geocoding API — lat/lon → nome da cidade (geocodificação reversa)
  http.get('https://api.opencagedata.com/geocode/v1/json', () => {
    return HttpResponse.json(mockGeocodeResponse);
  }),

  // Bing Daily Image — via proxy local (chamada direta ao Bing é bloqueada por CORS)
  http.get('http://localhost/api/bing-image', () => {
    return HttpResponse.json(mockBingResponse);
  }),
];
