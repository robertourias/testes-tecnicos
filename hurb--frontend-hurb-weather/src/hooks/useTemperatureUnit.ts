'use client';

import { useState, useCallback } from 'react';
import type { TemperatureUnit } from '@/types/ui';

interface TemperatureUnitState {
  unit: TemperatureUnit;
  toggleUnit: () => void;
}

export function useTemperatureUnit(): TemperatureUnitState {
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  }, []);

  return { unit, toggleUnit };
}
