/**
 * Formata data de previsão para label amigável
 *
 * Retorna:
 * - 'Hoje' para data atual
 * - 'Amanhã' para próximo dia
 * - 'Depois de amanhã' para dia seguinte
 *
 * @param dateStr - String de data no formato ISO ou timestamp
 */
export function formatWeatherDate(dateStr: string): string {
  const forecastDate = new Date(dateStr);
  const today = new Date();

  // Normalizar datas para meia-noite (remover horas) para comparação precisa
  const normalizedForecast = new Date(
    forecastDate.getFullYear(),
    forecastDate.getMonth(),
    forecastDate.getDate()
  );

  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Calcular diferença em dias
  const diffTime = normalizedForecast.getTime() - normalizedToday.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  switch (diffDays) {
    case 0:
      return 'Hoje';
    case 1:
      return 'Amanhã';
    case 2:
      return 'Depois de amanhã';
    default:
      // Fallback para datas futuras além de 2 dias
      return forecastDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      });
  }
}
