import type { Page } from '@playwright/test';

/** Gera resposta simulada do OpenWeather com datas relativas a hoje */
function buildWeatherResponse(tempCelsius = 25) {
  const now = new Date();

  const days = [0, 1, 2].map((offset) => {
    const d = new Date(now);
    d.setDate(d.getDate() + offset);
    d.setHours(12, 0, 0, 0);
    const dtTxt = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 12:00:00`;
    return {
      dt: Math.floor(d.getTime() / 1000),
      main: {
        temp: tempCelsius,
        feels_like: tempCelsius + 2,
        temp_min: tempCelsius - 2,
        temp_max: tempCelsius + 2,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1011,
        humidity: 65,
        temp_kf: 0,
      },
      weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 4, deg: 120, gust: 6 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: dtTxt,
    };
  });

  return {
    cod: '200',
    message: 0,
    cnt: days.length,
    list: days,
    city: {
      id: 3451190,
      name: 'Rio de Janeiro',
      coord: { lat: -22.9068, lon: -43.1729 },
      country: 'BR',
      population: 6320446,
      timezone: -10800,
      sunrise: 1652519400,
      sunset: 1652561400,
    },
  };
}

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
export async function setupMocks(page: Page, tempCelsius = 25): Promise<void> {
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({ latitude: -22.9068, longitude: -43.1729 });

  await page.route('**/api.opencagedata.com/**', (route) =>
    route.fulfill({ json: geocodeResponse })
  );

  await page.route('**/api.openweathermap.org/**', (route) =>
    route.fulfill({ json: buildWeatherResponse(tempCelsius) })
  );

  await page.route('**/www.bing.com/HPImageArchive**', (route) =>
    route.fulfill({ json: bingResponse })
  );
}
