# Skill: Component Builder

## Descrição

Workflow para criar novos componentes React seguindo os padrões do projeto (Next.js, TypeScript, CSS Modules).

## Gatilho

Usar quando:

- Criar um novo componente de UI
- Refatorar um componente existente
- Extrair lógica repetida em componente reutilizável

## Passos

### 1. Criar Estrutura de Arquivos

```
src/components/NomeDoComponente/
  index.ts               → re-export público
  NomeDoComponente.tsx   → implementação
  NomeDoComponente.module.css → estilos
  NomeDoComponente.test.tsx   → testes
```

### 2. Definir Props

```typescript
// NomeDoComponente.tsx
'use client'; // somente se necessário (interatividade, browser API)

interface NomeDoComponenteProps {
  // props tipadas explicitamente
  valor: string;
  onAcao: () => void;
  opcional?: boolean;
}
```

### 3. Implementar Componente

```tsx
import styles from './NomeDoComponente.module.css';

export function NomeDoComponente({ valor, onAcao, opcional = false }: NomeDoComponenteProps) {
  return <div className={styles.container}>{/* implementação */}</div>;
}
```

### 4. Criar Estilos

```css
/* NomeDoComponente.module.css */

/* Usar tokens definidos em /styles/tokens.css */
.container {
  /* layout */
}

/* Estado hover */
.container:hover {
}

/* Responsividade (mobile-first) */
@media (min-width: 768px) {
}
```

### 5. Criar index.ts

```typescript
// index.ts
export { NomeDoComponente } from './NomeDoComponente';
export type { NomeDoComponenteProps } from './NomeDoComponente';
```

### 6. Criar Teste Básico

```tsx
// NomeDoComponente.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NomeDoComponente } from './NomeDoComponente';

describe('NomeDoComponente', () => {
  const defaultProps = {
    valor: 'teste',
    onAcao: jest.fn(),
  };

  it('renderiza corretamente com props padrão', () => {
    render(<NomeDoComponente {...defaultProps} />);
    expect(screen.getByText('teste')).toBeInTheDocument();
  });

  it('chama onAcao ao interagir', async () => {
    const onAcao = jest.fn();
    render(<NomeDoComponente {...defaultProps} onAcao={onAcao} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onAcao).toHaveBeenCalledTimes(1);
  });
});
```

### 7. Checklist de Qualidade

- [ ] Props tipadas com interface explícita
- [ ] `'use client'` somente se estritamente necessário
- [ ] CSS em módulo separado, sem styles inline para layout
- [ ] Tokens CSS usados para cores e espaçamento
- [ ] `aria-label` em todos os elementos interativos
- [ ] Teste cobre: renderização, interação, estados (loading, error)
- [ ] Re-export via `index.ts`
- [ ] Mobile-first no CSS

## Componentes Específicos deste Projeto

### WeatherCard — Props esperadas

```typescript
interface WeatherCardProps {
  day: WeatherDay; // dados do dia
  unit: 'C' | 'F'; // unidade de temperatura atual
  onUnitToggle: () => void; // callback ao clicar na temperatura
  isToday?: boolean; // destaque visual para o dia atual
}
```

### LocationInput — Props esperadas

```typescript
interface LocationInputProps {
  value: string;
  onSearch: (location: string) => void;
  isLoading?: boolean;
  error?: string | null;
}
```
