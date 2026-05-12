/**
 * Mapeia código de condição climática da OpenWeather para ícone Meteocon
 *
 * Grupos de códigos OpenWeather:
 * - 2xx: Tempestade (thunderstorm)
 * - 3xx: Garoa (drizzle)
 * - 5xx: Chuva (rain)
 * - 6xx: Neve (snow)
 * - 7xx: Atmosfera (fog, mist, etc)
 * - 800: Céu limpo (clear)
 * - 80x: Nuvens (clouds)
 *
 * @see https://openweathermap.org/weather-conditions
 */
export function getMeteoconIcon(weatherCode: number): string {
  // Tempestade (2xx)
  if (weatherCode >= 200 && weatherCode < 300) {
    return 'cloud-flash';
  }

  // Garoa (3xx)
  if (weatherCode >= 300 && weatherCode < 400) {
    return 'cloud-drizzle';
  }

  // Chuva (5xx)
  if (weatherCode >= 500 && weatherCode < 600) {
    if (weatherCode === 511) {
      // Chuva congelante
      return 'cloud-hail';
    }
    return 'cloud-rain';
  }

  // Neve (6xx)
  if (weatherCode >= 600 && weatherCode < 700) {
    return 'cloud-snow';
  }

  // Atmosfera (7xx) - neblina, fumaça, etc
  if (weatherCode >= 700 && weatherCode < 800) {
    return 'cloud-fog';
  }

  // Céu limpo (800)
  if (weatherCode === 800) {
    return 'sun';
  }

  // Nuvens (80x)
  if (weatherCode > 800 && weatherCode < 900) {
    if (weatherCode === 801) {
      // Poucas nuvens
      return 'cloud-sun';
    }
    // Nuvens dispersas, quebradas ou cobertas
    return 'cloud';
  }

  // Fallback para código desconhecido
  return 'sun';
}
