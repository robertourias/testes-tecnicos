import { http, HttpResponse } from 'msw';
import { mockWeatherResponse, mockGeocodingResponse } from './data/weather';
import { mockGeocodeResponse } from './data/geocode';
import { mockBingResponse } from './data/bing';

export const handlers: Array<ReturnType<typeof http.get | typeof http.post>> = [
  // OpenWeather One Call API 3.0 — previsão por coordenadas
  http.get('https://api.openweathermap.org/data/3.0/onecall', () => {
    return HttpResponse.json(mockWeatherResponse);
  }),

  // OpenWeather Geocoding API — cidade → lat/lon
  http.get('http://api.openweathermap.org/geo/1.0/direct', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? '';

    // Simula cidade inválida retornando array vazio
    if (query.toUpperCase() === 'INVALID') {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(mockGeocodingResponse);
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
