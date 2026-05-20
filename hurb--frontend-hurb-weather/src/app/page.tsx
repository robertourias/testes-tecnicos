'use client';

import { BackgroundImage } from '@/components/BackgroundImage';
import { LocationInput } from '@/components/LocationInput';
import { WeatherGrid } from '@/components/WeatherGrid';
import { LoadingState } from '@/components/LoadingState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useWeather } from '@/hooks/useWeather';
import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';
import { getGradientTheme } from '@/utils/gradient';
import styles from './page.module.css';

export default function Home(): React.JSX.Element {
  const { location, forecast, backgroundImage, loading, error, setLocation, retryGeolocation } = useWeather();
  const { unit, toggleUnit } = useTemperatureUnit();

  const currentTemp = forecast[0]?.temp ?? null;
  const theme = getGradientTheme(currentTemp);

  return (
    <>
      <BackgroundImage imageUrl={backgroundImage} theme={theme} />

      <main className={styles.main}>
        <header className={styles.header}>
          {location && <p className={styles.locationLabel}>{location}</p>}
          <LocationInput
            value={location ?? ''}
            onSearch={setLocation}
            isLoading={loading}
            error={location ? error : null}
          />
        </header>

        <section className={styles.content}>
          {loading && <LoadingState />}
          {!loading && error && !location && (
            <ErrorMessage message={error} onRetry={retryGeolocation} />
          )}
          {!loading && !error && forecast.length > 0 && (
            <WeatherGrid forecast={forecast} unit={unit} onUnitToggle={toggleUnit} />
          )}
        </section>
      </main>
    </>
  );
}
