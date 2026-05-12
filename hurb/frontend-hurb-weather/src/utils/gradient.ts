import type { GradientTheme } from '@/types';

/**
 * Retorna tema de gradiente baseado na temperatura
 *
 * Ranges:
 * - null: 'neutral' (cinza)
 * - < 15°C: 'cold' (azul)
 * - 15-35°C: 'warm' (amarelo)
 * - > 35°C: 'hot' (vermelho)
 */
export function getGradientTheme(temp: number | null): GradientTheme {
  if (temp === null) {
    return 'neutral';
  }

  if (temp < 15) {
    return 'cold';
  }

  if (temp > 35) {
    return 'hot';
  }

  return 'warm';
}
