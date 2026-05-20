/**
 * Mock de dados da API OpenCage para testes
 * Simula resposta de geocodificação reversa para Rio de Janeiro
 */
import type { OpenCageResponse } from '@/types/geocode';

export const mockGeocodeResponse: OpenCageResponse = {
  documentation: 'https://opencagedata.com/api',
  licenses: [
    {
      name: 'see attribution guide',
      url: 'https://opencagedata.com/credits',
    },
  ],
  rate: {
    limit: 2500,
    remaining: 2499,
    reset: 1652572800,
  },
  results: [
    {
      annotations: {
        DMS: {
          lat: "22° 54' 24.48000'' S",
          lng: "43° 10' 22.44000'' W",
        },
        MGRS: '23KPQ4897516893',
        Maidenhead: 'GG87sc53od',
        Mercator: {
          x: -4805189.437,
          y: -2613067.835,
        },
        OSM: {
          edit_url: 'https://www.openstreetmap.org/edit?way=125456789#map=17/-22.90680/-43.17290',
          note_url: 'https://www.openstreetmap.org/note/new#map=17/-22.90680/-43.17290&layers=N',
          url: 'https://www.openstreetmap.org/?mlat=-22.90680&mlon=-43.17290#map=17/-22.90680/-43.17290',
        },
        UN_M49: {
          regions: {
            AMERICAS: '019',
            BR: '076',
            LATIN_AMERICA: '419',
            SOUTH_AMERICA: '005',
            WORLD: '001',
          },
          statistical_groupings: ['LEDC'],
        },
        callingcode: 55,
        currency: {
          alternate_symbols: ['R$'],
          decimal_mark: ',',
          html_entity: 'R$',
          iso_code: 'BRL',
          iso_numeric: '986',
          name: 'Brazilian Real',
          smallest_denomination: 5,
          subunit: 'Centavo',
          subunit_to_unit: 100,
          symbol: 'R$',
          symbol_first: 1,
          thousands_separator: '.',
        },
        flag: '🇧🇷',
        geohash: '75cm2rx6vs6z',
        qibla: 53.68,
        roadinfo: {
          drive_on: 'right',
          road: 'Avenida Atlântica',
          speed_in: 'km/h',
        },
        sun: {
          rise: {
            apparent: 1652519400,
            astronomical: 1652513400,
            civil: 1652517800,
            nautical: 1652515600,
          },
          set: {
            apparent: 1652561400,
            astronomical: 1652567400,
            civil: 1652563000,
            nautical: 1652565200,
          },
        },
        timezone: {
          name: 'America/Sao_Paulo',
          now_in_dst: 0,
          offset_sec: -10800,
          offset_string: '-0300',
          short_name: 'BRT',
        },
        what3words: {
          words: 'cheeks.sleeps.coils',
        },
      },
      bounds: {
        northeast: {
          lat: -22.9068,
          lng: -43.1729,
        },
        southwest: {
          lat: -22.9068,
          lng: -43.1729,
        },
      },
      components: {
        'ISO_3166-1_alpha-2': 'BR',
        'ISO_3166-1_alpha-3': 'BRA',
        'ISO_3166-2': ['BR-RJ'],
        _category: 'road',
        _type: 'road',
        city: 'Rio de Janeiro',
        city_district: 'Copacabana',
        continent: 'South America',
        country: 'Brazil',
        country_code: 'br',
        municipality: 'Rio de Janeiro',
        political_union: 'Mercosul',
        postcode: '22070-002',
        state: 'Rio de Janeiro',
        state_code: 'RJ',
        suburb: 'Copacabana',
      },
      confidence: 9,
      formatted: 'Avenida Atlântica, Copacabana, Rio de Janeiro - RJ, 22070-002, Brazil',
      geometry: {
        lat: -22.9068,
        lng: -43.1729,
      },
    },
  ],
  status: {
    code: 200,
    message: 'OK',
  },
  stay_informed: {
    blog: 'https://blog.opencagedata.com',
    mastodon: 'https://en.osm.town/@opencage',
  },
  thanks: 'For using an OpenCage API',
  timestamp: {
    created_http: 'Sat, 14 May 2022 14:30:00 GMT',
    created_unix: 1652538600,
  },
  total_results: 1,
};
