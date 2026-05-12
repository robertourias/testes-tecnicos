/**
 * Mock de dados da API OpenWeather para testes
 * Simula resposta de previsão de 5 dias para Rio de Janeiro
 */
import type { OpenWeatherResponse } from '@/types/weather';

export const mockWeatherResponse: OpenWeatherResponse = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    // Hoje - 12:00
    {
      dt: Date.now() / 1000,
      main: {
        temp: 28.5,
        feels_like: 30.2,
        temp_min: 27.8,
        temp_max: 28.5,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1011,
        humidity: 65,
        temp_kf: 0.7,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'Poucas nuvens',
          icon: '02d',
        },
      ],
      clouds: {
        all: 20,
      },
      wind: {
        speed: 4.5,
        deg: 120,
        gust: 6.2,
      },
      visibility: 10000,
      pop: 0.1,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now()).toISOString().replace('T', ' ').substring(0, 19),
    },
    // Hoje - 15:00
    {
      dt: Date.now() / 1000 + 3 * 3600,
      main: {
        temp: 29.2,
        feels_like: 31.5,
        temp_min: 28.5,
        temp_max: 29.2,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 1010,
        humidity: 62,
        temp_kf: 0.7,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01d',
        },
      ],
      clouds: {
        all: 5,
      },
      wind: {
        speed: 5.1,
        deg: 125,
        gust: 7.0,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 3 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Hoje - 18:00
    {
      dt: Date.now() / 1000 + 6 * 3600,
      main: {
        temp: 27.8,
        feels_like: 29.0,
        temp_min: 27.0,
        temp_max: 27.8,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 1010,
        humidity: 68,
        temp_kf: 0.8,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'Poucas nuvens',
          icon: '02n',
        },
      ],
      clouds: {
        all: 15,
      },
      wind: {
        speed: 4.2,
        deg: 115,
        gust: 5.8,
      },
      visibility: 10000,
      pop: 0.05,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 6 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Hoje - 21:00
    {
      dt: Date.now() / 1000 + 9 * 3600,
      main: {
        temp: 25.5,
        feels_like: 26.2,
        temp_min: 25.0,
        temp_max: 25.5,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1011,
        humidity: 72,
        temp_kf: 0.5,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.8,
        deg: 110,
        gust: 4.5,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 9 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 00:00
    {
      dt: Date.now() / 1000 + 12 * 3600,
      main: {
        temp: 24.2,
        feels_like: 24.8,
        temp_min: 24.0,
        temp_max: 24.2,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 75,
        temp_kf: 0.2,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.2,
        deg: 105,
        gust: 4.0,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 12 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 03:00
    {
      dt: Date.now() / 1000 + 15 * 3600,
      main: {
        temp: 23.5,
        feels_like: 24.0,
        temp_min: 23.5,
        temp_max: 23.5,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 78,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.0,
        deg: 100,
        gust: 3.5,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 15 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 06:00
    {
      dt: Date.now() / 1000 + 18 * 3600,
      main: {
        temp: 23.0,
        feels_like: 23.5,
        temp_min: 23.0,
        temp_max: 23.0,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1013,
        humidity: 80,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 2.8,
        deg: 95,
        gust: 3.2,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 18 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 09:00
    {
      dt: Date.now() / 1000 + 21 * 3600,
      main: {
        temp: 26.8,
        feels_like: 28.0,
        temp_min: 26.8,
        temp_max: 26.8,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1013,
        humidity: 70,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'Chuva leve',
          icon: '10d',
        },
      ],
      clouds: {
        all: 40,
      },
      wind: {
        speed: 3.5,
        deg: 110,
        gust: 4.8,
      },
      visibility: 10000,
      pop: 0.35,
      rain: {
        '3h': 0.5,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 21 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 12:00
    {
      dt: Date.now() / 1000 + 24 * 3600,
      main: {
        temp: 27.5,
        feels_like: 29.0,
        temp_min: 27.5,
        temp_max: 27.5,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 68,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'Chuva leve',
          icon: '10d',
        },
      ],
      clouds: {
        all: 50,
      },
      wind: {
        speed: 4.0,
        deg: 115,
        gust: 5.5,
      },
      visibility: 10000,
      pop: 0.45,
      rain: {
        '3h': 1.2,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 24 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 15:00
    {
      dt: Date.now() / 1000 + 27 * 3600,
      main: {
        temp: 28.0,
        feels_like: 29.8,
        temp_min: 28.0,
        temp_max: 28.0,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1011,
        humidity: 66,
        temp_kf: 0,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'Poucas nuvens',
          icon: '02d',
        },
      ],
      clouds: {
        all: 25,
      },
      wind: {
        speed: 4.5,
        deg: 120,
        gust: 6.0,
      },
      visibility: 10000,
      pop: 0.2,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 27 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 18:00
    {
      dt: Date.now() / 1000 + 30 * 3600,
      main: {
        temp: 26.5,
        feels_like: 27.5,
        temp_min: 26.5,
        temp_max: 26.5,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1011,
        humidity: 70,
        temp_kf: 0,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'Nuvens dispersas',
          icon: '03n',
        },
      ],
      clouds: {
        all: 30,
      },
      wind: {
        speed: 4.0,
        deg: 115,
        gust: 5.2,
      },
      visibility: 10000,
      pop: 0.15,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 30 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Amanhã - 21:00
    {
      dt: Date.now() / 1000 + 33 * 3600,
      main: {
        temp: 25.0,
        feels_like: 25.8,
        temp_min: 25.0,
        temp_max: 25.0,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 73,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01n',
        },
      ],
      clouds: {
        all: 10,
      },
      wind: {
        speed: 3.5,
        deg: 110,
        gust: 4.5,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 33 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Depois de amanhã - 00:00
    {
      dt: Date.now() / 1000 + 36 * 3600,
      main: {
        temp: 24.0,
        feels_like: 24.5,
        temp_min: 24.0,
        temp_max: 24.0,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 76,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01n',
        },
      ],
      clouds: {
        all: 5,
      },
      wind: {
        speed: 3.0,
        deg: 105,
        gust: 3.8,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 36 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Depois de amanhã - 03:00
    {
      dt: Date.now() / 1000 + 39 * 3600,
      main: {
        temp: 23.2,
        feels_like: 23.8,
        temp_min: 23.2,
        temp_max: 23.2,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 79,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 2.8,
        deg: 100,
        gust: 3.2,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'n',
      },
      dt_txt: new Date(Date.now() + 39 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Depois de amanhã - 06:00
    {
      dt: Date.now() / 1000 + 42 * 3600,
      main: {
        temp: 22.8,
        feels_like: 23.2,
        temp_min: 22.8,
        temp_max: 22.8,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1013,
        humidity: 81,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 2.5,
        deg: 95,
        gust: 3.0,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 42 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Depois de amanhã - 09:00
    {
      dt: Date.now() / 1000 + 45 * 3600,
      main: {
        temp: 27.0,
        feels_like: 28.2,
        temp_min: 27.0,
        temp_max: 27.0,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1013,
        humidity: 68,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.2,
        deg: 100,
        gust: 4.2,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 45 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
    // Depois de amanhã - 12:00
    {
      dt: Date.now() / 1000 + 48 * 3600,
      main: {
        temp: 30.0,
        feels_like: 32.5,
        temp_min: 30.0,
        temp_max: 30.0,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 60,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Céu limpo',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 4.0,
        deg: 110,
        gust: 5.5,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 48 * 3600 * 1000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
    },
  ],
  city: {
    id: 3451190,
    name: 'Rio de Janeiro',
    coord: {
      lat: -22.9068,
      lon: -43.1729,
    },
    country: 'BR',
    population: 6320446,
    timezone: -10800,
    sunrise: 1652519400,
    sunset: 1652561400,
  },
};
