import { http, HttpResponse } from 'msw';
import { mockWeatherResponse } from './data/weather';
import { mockGeocodeResponse } from './data/geocode';
import { mockBingResponse } from './data/bing';

export const handlers: Array<ReturnType<typeof http.get | typeof http.post>> = [
  // OpenWeather API
  http.get('http://api.openweathermap.org/data/2.5/forecast', () => {
    return HttpResponse.json(mockWeatherResponse);
  }),

  // OpenCage Geocoding API
  http.get('https://api.opencagedata.com/geocode/v1/json', () => {
    return HttpResponse.json(mockGeocodeResponse);
  }),

  // Bing Daily Image — via proxy local (a chamada direta ao Bing é bloqueada por CORS)
  http.get('http://localhost/api/bing-image', () => {
    return HttpResponse.json(mockBingResponse);
  }),
];
