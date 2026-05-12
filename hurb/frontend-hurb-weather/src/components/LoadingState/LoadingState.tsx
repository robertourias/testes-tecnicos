import styles from './LoadingState.module.css';

export function LoadingState(): React.JSX.Element {
  return (
    <section className={styles.grid} aria-label="Carregando previsão do tempo" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className={styles.skeleton}>
          <div className={styles.skeletonDate} />
          <div className={styles.skeletonIcon} />
          <div className={styles.skeletonTemp} />
          <div className={styles.skeletonDesc} />
        </div>
      ))}
    </section>
  );
}
