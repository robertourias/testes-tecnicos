'use client';

import { useState, useEffect } from 'react';
import type { Coordinates } from '@/types/geocode';

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ coordinates: null, error: 'Geolocalização não suportada neste navegador', loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
          loading: false,
        });
      },
      (err) => {
        const message =
          err.code === 1
            ? 'Permissão de localização negada'
            : err.code === 3
              ? 'Tempo limite excedido ao obter localização'
              : 'Não foi possível obter sua localização';

        setState({ coordinates: null, error: message, loading: false });
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  return state;
}
