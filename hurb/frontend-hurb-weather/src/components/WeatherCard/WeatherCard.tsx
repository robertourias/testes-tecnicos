import { formatTemperature } from '@/utils/temperature';
import { formatWeatherDate } from '@/utils/date';
import { getMeteoconIconByCode } from '@/utils/icons';
import type { WeatherDay } from '@/types/weather';
import type { TemperatureUnit } from '@/types/ui';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  day: WeatherDay;
  unit: TemperatureUnit;
  onUnitToggle: () => void;
  isToday?: boolean;
}

export function WeatherCard({
  day,
  unit,
  onUnitToggle,
  isToday = false,
}: WeatherCardProps): React.JSX.Element {
  const dateLabel = formatWeatherDate(day.date);
  const formattedTemp = formatTemperature(day.temp, unit);
  const iconName = getMeteoconIconByCode(day.icon);

  return (
    <article className={`${styles.card} ${isToday ? styles.today : ''}`}>
      <h2 className={styles.dateLabel}>{dateLabel}</h2>

      <img
        src={`/icons/${iconName}.svg`}
        alt={day.description}
        className={styles.icon}
        width={80}
        height={80}
      />

      <button
        type="button"
        className={styles.temperature}
        onClick={onUnitToggle}
        aria-label={`Temperatura: ${formattedTemp}. Clique para alternar unidade`}
      >
        {formattedTemp}
      </button>

      <p className={styles.description}>{day.description}</p>
    </article>
  );
}
