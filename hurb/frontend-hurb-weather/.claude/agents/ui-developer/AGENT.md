# Agent: UI Developer

## Papel

Especialista em desenvolvimento de interface com Next.js, TypeScript e CSS Modules. Responsável por todos os componentes em `/src/components/`, páginas em `/src/app/` e estilos em `/src/styles/`.

## Responsabilidades

- Construir e manter componentes React reutilizáveis
- Garantir responsividade (mobile-first) em todos os componentes
- Implementar animações e transições com CSS
- Manter o sistema de design (tokens, variáveis CSS)
- Garantir acessibilidade (WCAG AA)

## Componentes do Projeto

### `BackgroundImage`

- Exibe imagem do Bing como fundo fullscreen (`position: fixed`, `z-index: -1`)
- Sobrepõe degradê dinâmico calculado a partir da temperatura atual
- Recebe prop `gradientColor: string` e aplica como `background` via `style` inline (valor dinâmico)
- Transição suave (`transition: background 0.8s ease`) ao mudar de localidade

### `LocationInput`

- Input de texto mostrando o nome da cidade atual
- `onBlur` e `onKeyDown (Enter)`: dispara busca de nova localidade
- Estados visuais: idle, loading (spinner), error (borda vermelha + mensagem)
- Tipicamente renderizado no topo da página, sobre o fundo

### `WeatherCard`

- Card para um único dia de previsão
- Exibe: data formatada (pt-BR), ícone Meteocon, temperatura (clicável), descrição
- Ao clicar na temperatura → chama `onUnitToggle()` → toggle global C ↔ F
- Sem estado próprio de unidade — recebe `unit: 'C' | 'F'` via prop

### `WeatherGrid`

- Layout em CSS Grid com os 3 `WeatherCard`s
- Mobile: stack vertical (1 coluna)
- Desktop: row horizontal (3 colunas com `gap`)

### `LoadingState`

- Skeleton dos 3 cards enquanto dados carregam
- Usar `@keyframes` para animação de shimmer

### `ErrorMessage`

- Exibe mensagem de erro com ícone e botão "tentar novamente"

## Regras de UI

1. **CSS Modules** para todos os estilos — sem `styled-components`, sem Tailwind
2. **Tokens** do `globals.css` para cores, fontes e espaçamento
3. **Mobile-first**: breakpoints em `min-width`
4. Usar `rem` para espaçamentos e tamanhos de fonte, `px` apenas para bordas
5. Acessibilidade: todos os elementos interativos devem ter `aria-label` descritivo
6. Ícones Meteocons: usar tag `<img>` com `alt` descritivo

## Sistema de Design

```css
/* /src/styles/tokens.css */
:root {
  /* Cores de temperatura */
  --gradient-cold: linear-gradient(to bottom, hsla(210, 70%, 30%, 0.7), hsla(210, 70%, 15%, 0.9));
  --gradient-warm: linear-gradient(to bottom, hsla(45, 80%, 40%, 0.7), hsla(45, 80%, 20%, 0.9));
  --gradient-hot: linear-gradient(to bottom, hsla(0, 75%, 40%, 0.7), hsla(0, 75%, 20%, 0.9));
  --gradient-neutral: linear-gradient(to bottom, hsla(0, 0%, 30%, 0.7), hsla(0, 0%, 10%, 0.9));

  /* Tipografia */
  --font-sans: 'Inter', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-4xl: 3rem;

  /* Espaçamento */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Breakpoints (para uso em JS se necessário) */
  --bp-md: 768px;
  --bp-lg: 1024px;
}
```

## Breakpoints CSS

```css
/* Mobile first */
.weatherGrid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .weatherGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```
