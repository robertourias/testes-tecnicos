import { renderHook, waitFor, act } from '@testing-library/react';
import { useWeather } from '../useWeather';
import { reverseGeocode } from '@/services/opencage';
import { getWeatherForecast } from '@/services/openweather';
import { getBingDailyImage } from '@/services/bing';
import type { WeatherDay } from '@/types/weather';

// jsdom não expõe GeolocationPositionError — usar constante numérica
const GEO_PERMISSION_DENIED = 1;

jest.mock('@/services/opencage');
jest.mock('@/services/openweather');
jest.mock('@/services/bing');

const mockReverseGeocode = reverseGeocode as jest.MockedFunction<typeof reverseGeocode>;
const mockGetWeatherForecast = getWeatherForecast as jest.MockedFunction<typeof getWeatherForecast>;
const mockGetBingDailyImage = getBingDailyImage as jest.MockedFunction<typeof getBingDailyImage>;

const mockForecast: WeatherDay[] = [
  { date: '2024-05-12', temp: 28, feelsLike: 30, description: 'Poucas nuvens', icon: '02d' },
  { date: '2024-05-13', temp: 26, feelsLike: 27, description: 'Chuva leve', icon: '10d' },
  { date: '2024-05-14', temp: 30, feelsLike: 32, description: 'Céu limpo', icon: '01d' },
];

const mockGetCurrentPosition = jest.fn();

function mockGeolocationSuccess(lat = -22.9068, lng = -43.1729): void {
  mockGetCurrentPosition.mockImplementation((success: PositionCallback) => {
    success({
      coords: { latitude: lat, longitude: lng },
    } as GeolocationPosition);
  });
}

function mockGeolocationError(code = GEO_PERMISSION_DENIED): void {
  mockGetCurrentPosition.mockImplementation(
    (_: PositionCallback, error: PositionErrorCallback) => {
      error({ code, message: 'Error' } as GeolocationPositionError);
    }
  );
}

beforeEach(() => {
  jest.clearAllMocks();

  Object.defineProperty(global.navigator, 'geolocation', {
    value: { getCurrentPosition: mockGetCurrentPosition },
    configurable: true,
  });

  mockReverseGeocode.mockResolvedValue('Rio de Janeiro');
  mockGetWeatherForecast.mockResolvedValue(mockForecast);
  mockGetBingDailyImage.mockResolvedValue('https://www.bing.com/th?id=OHR.Test.jpg');
});

describe('useWeather', () => {
  it('completa o fluxo: geolocalização → geocode → previsão', async () => {
    mockGeolocationSuccess();

    const { result } = renderHook(() => useWeather());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.location).toBe('Rio de Janeiro');
    expect(result.current.forecast).toHaveLength(3);
    expect(result.current.backgroundImage).toContain('bing.com');
  });

  it('chama reverseGeocode com as coordenadas corretas', async () => {
    mockGeolocationSuccess(-22.9068, -43.1729);

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockReverseGeocode).toHaveBeenCalledWith(-22.9068, -43.1729);
  });

  it('busca imagem do Bing em paralelo com a previsão', async () => {
    mockGeolocationSuccess();

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockGetWeatherForecast).toHaveBeenCalledWith('Rio de Janeiro');
    expect(mockGetBingDailyImage).toHaveBeenCalled();
  });

  it('atualiza forecast ao chamar setLocation com nova cidade', async () => {
    mockGeolocationSuccess();

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const saoPauloForecast: WeatherDay[] = [
      { date: '2024-05-12', temp: 22, feelsLike: 23, description: 'Nublado', icon: '04d' },
      { date: '2024-05-13', temp: 20, feelsLike: 21, description: 'Chuva', icon: '10d' },
      { date: '2024-05-14', temp: 25, feelsLike: 26, description: 'Parcialmente nublado', icon: '02d' },
    ];
    mockGetWeatherForecast.mockResolvedValueOnce(saoPauloForecast);

    act(() => {
      result.current.setLocation('São Paulo');
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.location).toBe('São Paulo');
    expect(mockGetWeatherForecast).toHaveBeenLastCalledWith('São Paulo');
  });

  it('expõe erro quando geolocalização é negada', async () => {
    mockGeolocationError(GEO_PERMISSION_DENIED);

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Permissão de localização negada');
    expect(result.current.forecast).toHaveLength(0);
    expect(result.current.location).toBeNull();
  });

  it('expõe erro quando a API de previsão falha', async () => {
    mockGeolocationSuccess();
    mockGetWeatherForecast.mockRejectedValueOnce(new Error('Localidade não encontrada'));

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Localidade não encontrada');
    expect(result.current.forecast).toHaveLength(0);
  });

  it('expõe erro quando geocode falha', async () => {
    mockGeolocationSuccess();
    mockReverseGeocode.mockRejectedValueOnce(new Error('Erro ao geocodificar'));

    const { result } = renderHook(() => useWeather());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Erro ao geocodificar');
  });
});
