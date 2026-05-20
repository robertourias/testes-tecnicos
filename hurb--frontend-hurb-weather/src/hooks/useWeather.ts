'use client';

import { useState, useEffect, useCallback } from 'react';
import { useGeolocation } from './useGeolocation';
import { reverseGeocode } from '@/services/opencage';
import { getWeatherForecast, getWeatherForecastByCoords } from '@/services/openweather';
import { getBingDailyImage } from '@/services/bing';
import type { WeatherDay } from '@/types/weather';

interface WeatherState {
  location: string | null;
  forecast: WeatherDay[];
  backgroundImage: string | null;
  loading: boolean;
  error: string | null;
  setLocation: (location: string) => void;
  retryGeolocation: () => void;
}

export function useWeather(): WeatherState {
  const [geoRetryCount, setGeoRetryCount] = useState(0);
  const { coordinates, error: geoError, loading: geoLoading } = useGeolocation(geoRetryCount);

  const [location, setLocationState] = useState<string | null>(null);
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca por nome de cidade (manual): geocode → One Call API
  const fetchWeatherForLocation = useCallback(async (loc: string) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, imageUrl] = await Promise.all([
        getWeatherForecast(loc),
        getBingDailyImage(),
      ]);

      setForecast(weatherData);
      setBackgroundImage(imageUrl);
      setLocationState(loc);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar previsão do tempo');
    } finally {
      setLoading(false);
    }
  }, []);

  // Resolução automática via geolocalização:
  // reverseGeocode + getWeatherForecastByCoords + getBingDailyImage em paralelo
  useEffect(() => {
    if (geoLoading) return;

    if (geoError) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(geoError);
      setLoading(false);
      return;
    }

    if (!coordinates) return;

    const resolveByCoords = async () => {
      try {
        const [cityName, weatherData, imageUrl] = await Promise.all([
          reverseGeocode(coordinates.lat, coordinates.lng),
          getWeatherForecastByCoords(coordinates.lat, coordinates.lng),
          getBingDailyImage(),
        ]);

        setForecast(weatherData);
        setBackgroundImage(imageUrl);
        setLocationState(cityName);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar previsão do tempo');
      } finally {
        setLoading(false);
      }
    };

    resolveByCoords();
  }, [coordinates, geoError, geoLoading]);

  const setLocation = useCallback(
    (loc: string) => {
      if (!loc.trim()) return;
      fetchWeatherForLocation(loc.trim());
    },
    [fetchWeatherForLocation]
  );

  const retryGeolocation = useCallback(() => {
    setError(null);
    setLoading(true);
    setGeoRetryCount((n) => n + 1);
  }, []);

  return { location, forecast, backgroundImage, loading, error, setLocation, retryGeolocation };
}
