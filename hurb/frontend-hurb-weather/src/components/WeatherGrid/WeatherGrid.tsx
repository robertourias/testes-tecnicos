import { WeatherCard } from '@/components/WeatherCard';
import type { WeatherDay } from '@/types/weather';
import type { TemperatureUnit } from '@/types/ui';
import styles from './WeatherGrid.module.css';

interface WeatherGridProps {
  forecast: WeatherDay[];
  unit: TemperatureUnit;
  onUnitToggle: () => void;
}

export function WeatherGrid({ forecast, unit, onUnitToggle }: WeatherGridProps): React.JSX.Element {
  return (
    <section className={styles.grid} aria-label="Previsão do tempo">
      {forecast.map((day, index) => (
        <WeatherCard
          key={day.date}
          day={day}
          unit={unit}
          onUnitToggle={onUnitToggle}
          isToday={index === 0}
        />
      ))}
    </section>
  );
}
