import { renderHook, waitFor } from '@testing-library/react';
import { useGeolocation } from '../useGeolocation';

// jsdom não expõe GeolocationPositionError — usar constantes numéricas
const GEO_PERMISSION_DENIED = 1;
const GEO_POSITION_UNAVAILABLE = 2;
const GEO_TIMEOUT = 3;

const mockGetCurrentPosition = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(global.navigator, 'geolocation', {
    value: { getCurrentPosition: mockGetCurrentPosition },
    configurable: true,
  });
});

describe('useGeolocation', () => {
  it('retorna loading=true no estado inicial', () => {
    mockGetCurrentPosition.mockImplementation(() => {});

    const { result } = renderHook(() => useGeolocation());

    expect(result.current.loading).toBe(true);
    expect(result.current.coordinates).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('retorna coordenadas quando geolocalização é bem-sucedida', async () => {
    mockGetCurrentPosition.mockImplementation((success: PositionCallback) => {
      success({
        coords: { latitude: -22.9068, longitude: -43.1729 },
      } as GeolocationPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.coordinates).toEqual({ lat: -22.9068, lng: -43.1729 });
    expect(result.current.error).toBeNull();
  });

  it('retorna erro quando permissão é negada', async () => {
    mockGetCurrentPosition.mockImplementation(
      (_: PositionCallback, error: PositionErrorCallback) => {
        error({ code: GEO_PERMISSION_DENIED, message: 'User denied' } as GeolocationPositionError);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.coordinates).toBeNull();
    expect(result.current.error).toBe('Permissão de localização negada');
  });

  it('retorna erro de timeout quando excede o tempo limite', async () => {
    mockGetCurrentPosition.mockImplementation(
      (_: PositionCallback, error: PositionErrorCallback) => {
        error({ code: GEO_TIMEOUT, message: 'Timeout' } as GeolocationPositionError);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.coordinates).toBeNull();
    expect(result.current.error).toBe('Tempo limite excedido ao obter localização');
  });

  it('retorna erro genérico para POSITION_UNAVAILABLE', async () => {
    mockGetCurrentPosition.mockImplementation(
      (_: PositionCallback, error: PositionErrorCallback) => {
        error({ code: GEO_POSITION_UNAVAILABLE, message: 'Unavailable' } as GeolocationPositionError);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Não foi possível obter sua localização');
  });

  it('retorna erro quando geolocation não está disponível no browser', async () => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.coordinates).toBeNull();
    expect(result.current.error).toBe('Geolocalização não suportada neste navegador');
  });
});
