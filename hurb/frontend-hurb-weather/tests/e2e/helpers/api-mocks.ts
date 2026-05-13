import type { Page } from '@playwright/test';

/** Gera resposta simulada da One Call API 3.0 com datas relativas a hoje */
function buildWeatherResponse(tempDay = 25) {
  const now = new Date();

  const daily = [0, 1, 2, 3, 4, 5, 6, 7].map((offset) => {
    const d = new Date(now);
    d.setDate(d.getDate() + offset);
    d.setHours(12, 0, 0, 0);

    return {
      dt: Math.floor(d.getTime() / 1000),
      temp: { day: tempDay, min: tempDay - 4, max: tempDay + 4, night: tempDay - 6, eve: tempDay - 2, morn: tempDay - 3 },
      feels_like: { day: tempDay + 2, night: tempDay - 4, eve: tempDay, morn: tempDay - 1 },
      pressure: 1013,
      humidity: 65,
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }],
      clouds: 0,
      pop: 0,
      uvi: 5,
    };
  });

  return {
    lat: -22.9068,
    lon: -43.1729,
    timezone: 'America/Sao_Paulo',
    timezone_offset: -10800,
    daily,
  };
}

const geocodingResponse = [
  { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729, country: 'BR' },
];

const geocodeResponse = {
  results: [
    {
      components: { city: 'Rio de Janeiro' },
      formatted: 'Rio de Janeiro, Brazil',
      geometry: { lat: -22.9068, lng: -43.1729 },
      confidence: 9,
      annotations: {},
      bounds: { northeast: { lat: -22, lng: -43 }, southwest: { lat: -23, lng: -44 } },
    },
  ],
  status: { code: 200, message: 'OK' },
  total_results: 1,
  documentation: '',
  licenses: [],
  rate: { limit: 2500, remaining: 2499, reset: 0 },
  stay_informed: { blog: '', mastodon: '' },
  thanks: '',
  timestamp: { created_http: '', created_unix: 0 },
};

const bingResponse = {
  images: [{ url: '/th?id=OHR.TestImage_PT-BR.jpg&rf=LaDigue_1920x1080.jpg' }],
};

/** Configura geolocalização e mocks de API no contexto Playwright */
export async function setupMocks(page: Page, tempDay = 25): Promise<void> {
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({ latitude: -22.9068, longitude: -43.1729 });

  // One Call API 3.0 — previsão por coordenadas
  await page.route('**/api.openweathermap.org/data/3.0/onecall**', (route) =>
    route.fulfill({ json: buildWeatherResponse(tempDay) })
  );

  // OpenWeather Geocoding — cidade → lat/lon (para busca manual)
  await page.route('**/api.openweathermap.org/geo/1.0/direct**', (route) =>
    route.fulfill({ json: geocodingResponse })
  );

  // OpenCage — lat/lon → nome da cidade (reverse geocode)
  await page.route('**/api.opencagedata.com/**', (route) =>
    route.fulfill({ json: geocodeResponse })
  );

  // Bing — via proxy local
  await page.route('**/api/bing-image**', (route) =>
    route.fulfill({ json: bingResponse })
  );
}
