import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps): React.JSX.Element {
  return (
    <div className={styles.container} role="alert">
      <span className={styles.icon} aria-hidden="true">⚠</span>
      <p className={styles.message}>{message}</p>
      <button type="button" className={styles.retryButton} onClick={onRetry}>
        Tentar novamente
      </button>
    </div>
  );
}
