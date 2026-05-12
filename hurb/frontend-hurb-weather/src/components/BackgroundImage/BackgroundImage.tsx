import type { GradientTheme } from '@/types';
import styles from './BackgroundImage.module.css';

interface BackgroundImageProps {
  imageUrl: string | null;
  theme: GradientTheme;
}

export function BackgroundImage({ imageUrl, theme }: BackgroundImageProps): React.JSX.Element {
  return (
    <div className={styles.container} aria-hidden="true">
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className={styles.image} />
      )}
      <div className={`${styles.overlay} ${styles[theme]}`} />
    </div>
  );
}
