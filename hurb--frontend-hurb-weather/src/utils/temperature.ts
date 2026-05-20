import type { TemperatureUnit } from '@/types';

/**
 * Converte temperatura de Celsius para Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Converte temperatura de Fahrenheit para Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Formata temperatura com unidade apropriada
 */
export function formatTemperature(temp: number, unit: TemperatureUnit): string {
  const value = unit === 'F' ? celsiusToFahrenheit(temp) : temp;
  return `${Math.round(value)}°${unit}`;
}
