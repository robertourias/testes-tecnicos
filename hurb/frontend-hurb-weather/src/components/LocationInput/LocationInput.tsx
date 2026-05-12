'use client';

import { useState, useEffect } from 'react';
import styles from './LocationInput.module.css';

interface LocationInputProps {
  value: string;
  onSearch: (location: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function LocationInput({
  value,
  onSearch,
  isLoading = false,
  error = null,
}: LocationInputProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleBlur = (): void => {
    const trimmed = inputValue.trim();
    if (trimmed && trimmed !== value) {
      onSearch(trimmed);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-label="Buscar localidade"
          disabled={isLoading}
          placeholder="Digite uma cidade..."
        />
        {isLoading && <span className={styles.spinner} aria-label="Carregando" role="status" />}
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
