import { renderHook, waitFor, act } from '@testing-library/react';
import { useWeather } from '../useWeather';
import { reverseGeocode } from '@/services/opencage';
import { getWeatherForecast, getWeatherForecastByCoords } from '@/services/openweather';
import { getBingDailyImage } from '@/services/bing';
import type { WeatherDay } from '@/types/weather';

const GEO_PERMISSION_DENIED = 1;

jest.mock('@/services/opencage');
jest.mock('@/services/openweather');
jest.mock('@/services/bing');

const mockReverseGeocode = reverseGeocode as jest.MockedFunction<typeof reverseGeocode>;
const mockGetWeatherForecast = getWeatherForecast as jest.MockedFunction<typeof getWeatherForecast>;
const mockGetWeatherForecastByCoords = getWeatherForecastByCoords as jest.MockedFunction<typeof getWeatherForecastByCoords>;
const mockGetBingDailyImage = getBingDailyImage as jest.MockedFunction<typeof getBingDailyImage>;

const mockForecast: WeatherDay[] = [
  { date: '2024-05-12 12:00:00', temp: 28, feelsLike: 30, description: 'Poucas nuvens', icon: '02d' },
  { date: '2024-05-13 12:00:00', temp: 26, feelsLike: 27, description: 'Chuva leve', icon: '10d' },
  { date: '2024-05-14 12:00:00', temp: 30, feelsLike: 32, description: 'Céu limpo', icon: '01d' },
];

const mockGetCurrentPosition = jest.fn();

function mockGeolocationSuccess(lat = -22.9068, lng = -43.1729): void {
  mockGetCurrentPosition.mockImplementation((success: PositionCallback) => {
    success({ coords: { latitude: lat, longitude: lng } } as GeolocationPosition);
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

  // Fluxo de geolocalização: byCoords + reverseGeocode + Bing em paralelo
  mockReverseGeocode.mockResolvedValue('Rio de Janeiro');
  mockGetWeatherForecastByCoords.mockResolvedValue(mockForecast);
  // Fluxo manual (setLocation): getWeatherForecast + Bing em paralelo
  mockGetWeatherForecast.mockResolvedValue(mockForecast);
  mockGetBingDailyImage.mockResolvedValue('https://www.bing.com/th?id=OHR.Test.jpg');
});

describe('useWeather', () => {
  it('completa o fluxo de geolocalização: coords → reverseGeocode + byCoords + Bing', async () => {
    mockGeolocationSuccess();

    const { result } = renderHook(() => useWeather());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.location).toBe('Rio de Janeiro');
    expect(result.current.forecast).toHaveLength(3);
    expect(result.current.backgroundImage).toContain('bing.com');
  });

  it('chama getWeatherForecastByCoords com as coordenadas da geolocalização', async () => {
    mockGeolocationSuccess(-22.9068, -43.1729);

    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockGetWeatherForecastByCoords).toHaveBeenCalledWith(-22.9068, -43.1729);
    expect(mockGetWeatherForecast).not.toHaveBeenCalled();
  });

  it('chama reverseGeocode com as coordenadas corretas', async () => {
    mockGeolocationSuccess(-22.9068, -43.1729);

    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockReverseGeocode).toHaveBeenCalledWith(-22.9068, -43.1729);
  });

  it('busca reverseGeocode, byCoords e Bing em paralelo', async () => {
    mockGeolocationSuccess();

    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockReverseGeocode).toHaveBeenCalled();
    expect(mockGetWeatherForecastByCoords).toHaveBeenCalled();
    expect(mockGetBingDailyImage).toHaveBeenCalled();
  });

  it('atualiza forecast ao chamar setLocation com nova cidade', async () => {
    mockGeolocationSuccess();

    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const saoPauloForecast: WeatherDay[] = [
      { date: '2024-05-12 12:00:00', temp: 22, feelsLike: 23, description: 'Nublado', icon: '04d' },
      { date: '2024-05-13 12:00:00', temp: 20, feelsLike: 21, description: 'Chuva', icon: '10d' },
      { date: '2024-05-14 12:00:00', temp: 25, feelsLike: 26, description: 'Parcialmente nublado', icon: '02d' },
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

  it('expõe erro quando getWeatherForecastByCoords falha', async () => {
    mockGeolocationSuccess();
    mockGetWeatherForecastByCoords.mockRejectedValueOnce(new Error('Chave inválida'));

    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Chave inválida');
    expect(result.current.forecast).toHaveLength(0);
  });

  it('expõe erro quando reverseGeocode falha', async () => {
    mockGeolocationSuccess();
    mockReverseGeocode.mockRejectedValueOnce(new Error('Erro ao geocodificar'));

    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Erro ao geocodificar');
  });

  it('ignora setLocation com string vazia', async () => {
    mockGeolocationSuccess();

    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const callsBefore = mockGetWeatherForecast.mock.calls.length;

    act(() => {
      result.current.setLocation('   ');
    });

    expect(mockGetWeatherForecast.mock.calls.length).toBe(callsBefore);
  });
});
