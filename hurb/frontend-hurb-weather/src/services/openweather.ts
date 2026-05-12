/**
 * Serviço de integração com OpenWeather API
 * Documentação: https://openweathermap.org/forecast5
 */
import type { OpenWeatherResponse, WeatherDay } from '@/types/weather';

const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_APPID;

/**
 * Busca previsão do tempo para uma localidade
 *
 * Retorna array de 3 dias (hoje, amanhã, depois de amanhã)
 * com dados normalizados de temperatura, descrição e ícone
 *
 * @param location - Nome da cidade (ex: "Rio de Janeiro", "São Paulo,BR")
 * @returns Promise com array de 3 WeatherDay
 * @throws Error em caso de falha na requisição
 */
export async function getWeatherForecast(location: string): Promise<WeatherDay[]> {
  if (!API_KEY) {
    throw new Error('Chave de API do OpenWeather não configurada');
  }

  if (!location.trim()) {
    throw new Error('Nome da localidade não pode ser vazio');
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(location.trim())}&APPID=${API_KEY}&units=metric&lang=pt_br`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Localidade "${location}" não encontrada`);
    }
    if (response.status === 401) {
      throw new Error('Chave de API do OpenWeather inválida ou expirada');
    }
    throw new Error(`Falha ao buscar previsão para "${location}" (HTTP ${response.status})`);
  }

  const data: OpenWeatherResponse = await response.json();

  // Normalizar dados: agrupar por dia e extrair previsão do meio-dia (~12h)
  return extractThreeDayForecast(data);
}

/**
 * Extrai previsão de 3 dias da resposta da API
 *
 * A API retorna previsões de 3 em 3 horas (40 itens para 5 dias)
 * Agrupa por dia e pega a previsão mais próxima do meio-dia de cada dia
 *
 * @param data - Resposta bruta da API OpenWeather
 * @returns Array de 3 WeatherDay normalizados
 */
function extractThreeDayForecast(data: OpenWeatherResponse): WeatherDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Agrupar itens por dia
  const itemsByDay = new Map<string, typeof data.list>();

  for (const item of data.list) {
    const itemDate = new Date(item.dt * 1000);
    // Usar componentes locais para evitar shift de timezone ao parsear depois
    const y = itemDate.getFullYear();
    const m = String(itemDate.getMonth() + 1).padStart(2, '0');
    const d = String(itemDate.getDate()).padStart(2, '0');
    const dayKey = `${y}-${m}-${d} 12:00:00`;

    if (!itemsByDay.has(dayKey)) {
      itemsByDay.set(dayKey, []);
    }
    itemsByDay.get(dayKey)!.push(item);
  }

  // Pegar os 3 primeiros dias disponíveis
  const days = Array.from(itemsByDay.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .slice(0, 3);

  return days.map(([date, items]) => {
    // Buscar item mais próximo do meio-dia (12:00)
    const noonItem = items.reduce((closest, current) => {
      const closestHour = new Date(closest.dt * 1000).getHours();
      const currentHour = new Date(current.dt * 1000).getHours();
      const closestDiff = Math.abs(closestHour - 12);
      const currentDiff = Math.abs(currentHour - 12);
      return currentDiff < closestDiff ? current : closest;
    });

    return {
      date,
      temp: Math.round(noonItem.main.temp),
      feelsLike: Math.round(noonItem.main.feels_like),
      description: noonItem.weather[0]?.description || 'Sem informações',
      icon: noonItem.weather[0]?.icon || '01d',
    };
  });
}
