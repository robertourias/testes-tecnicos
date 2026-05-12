# Melhorias Propostas ao Layout

Este documento registra as decisões de design que divergem ou expandem o layout de referência (`exemplo.jpg`), com justificativa e impacto esperado na UX.

---

## 1. Ícones SVG customizados em vez de imagens raster

**Decisão:** Criar ícones SVG próprios com estilo "branco sobre transparente" em vez de usar o pack Meteocons original (PNG).

**Justificativa:**
- SVGs são infinitamente escaláveis — sem pixelação em telas Retina/HiDPI
- O estilo monocromático branco se integra organicamente com os fundos de degradê escuros, enquanto ícones coloridos criariam conflito visual
- Versionados no repositório, sem dependência de download externo

**Impacto na UX:** Ícones mais nítidos em qualquer resolução e visual mais coeso com o tema escuro.

---

## 2. Backdrop blur no glassmorphism dos cards

**Decisão:** Aplicar `backdrop-filter: blur(12px)` nos cards e no input, criando um efeito de vidro fosco sobre a imagem de fundo.

**Justificativa:**
- O layout de referência mostra cards com fundo semi-transparente, mas sem blur explícito
- O blur adiciona profundidade e separa visualmente o conteúdo do fundo sem perder a sensação de "janela sobre a paisagem"
- Aumenta legibilidade mantendo o apelo estético

**Impacto na UX:** Leitura mais fácil das temperaturas e descrições, especialmente em fundos de alto contraste.

---

## 3. Animação fadeInUp nos cards com stagger

**Decisão:** Os 3 cards surgem com animação `fadeInUp` (opacidade + translação vertical) ao carregar, com atraso escalonado de 100ms entre cada.

**Justificativa:**
- Feedback visual claro de que novos dados chegaram
- O stagger guia o olhar da esquerda para a direita (hoje → amanhã → depois), reforçando a narrativa temporal
- Respeita `prefers-reduced-motion`: se o usuário configurou redução de movimento no sistema, as animações são desativadas

**Impacto na UX:** Transição mais fluida entre estados de loading e dados, sem parecer "pop-in" abrupto.

---

## 4. Temperatura clicável como botão com feedback de escala

**Decisão:** A temperatura é renderizada como `<button>` com `transform: scale(0.96)` no `:active`, além de hover com fundo suave.

**Justificativa:**
- O layout de referência não especifica como o toggle de unidade é acionado
- Tornar a temperatura um botão explícito (com feedback tátil) é mais acessível e intuitivo que clicar em texto comum
- O `aria-label` descreve a ação para leitores de tela: "Temperatura: 28°C. Clique para alternar unidade"
- `min-height: 44px` e `min-width: 44px` garantem área de toque adequada em mobile (recomendação WCAG)

**Impacto na UX:** Interação mais clara e acessível, especialmente em dispositivos touch.

---

## 5. Destaque visual para o card "Hoje"

**Decisão:** O primeiro card ("Hoje") recebe borda mais opaca e fundo levemente mais escuro via classe `.today`.

**Justificativa:**
- Orienta rapidamente o usuário para a informação mais relevante (temperatura atual)
- O destaque é sutil — não quebra a uniformidade visual dos 3 cards

**Impacto na UX:** Hierarquia visual clara sem desbalancear o layout.

---

## 6. Input de busca com estado de erro inline

**Decisão:** Erros de busca (cidade não encontrada, API indisponível) são exibidos diretamente abaixo do input como texto vermelho suave, enquanto erros de geolocalização (permissão negada, API indisponível) aparecem no `ErrorMessage` central.

**Justificativa:**
- Erros de busca são "locais" ao input — faz sentido exibir perto da ação que os causou
- Erros de geolocalização bloqueiam o carregamento inicial inteiro, então merecem destaque central com botão de retry
- Separa os dois contextos de erro, evitando sobreposição de mensagens

**Impacto na UX:** Feedback contextual — o usuário entende imediatamente qual ação causou o erro e onde corrigi-la.

---

## 7. Responsividade com 4 breakpoints

**Decisão:** Implementar breakpoints em 480px, 768px, 1024px e 1280px em vez de apenas mobile/desktop.

**Justificativa:**
- O layout de referência é desktop-first; a implementação é mobile-first
- O breakpoint 480px cobre iPhones Plus e androids intermediários onde o layout de 375px tem padding excessivo
- O breakpoint 1024px ajusta o gap do grid antes do "salto" para 1280px

**Impacto na UX:** Layout confortável em uma gama mais ampla de dispositivos sem "saltos" bruscos de layout.

---

## 8. Suporte a `prefers-reduced-motion`

**Decisão:** O `globals.css` inclui `@media (prefers-reduced-motion: reduce)` que desativa todas as animações e transições para usuários que configuraram isso no sistema operacional.

**Justificativa:**
- Parte da especificação WCAG 2.1 AA (critério 2.3.3)
- Usuários com epilepsia fotossensível, vertigem ou outros distúrbios vestibulares podem ser afetados por animações

**Impacto na UX:** Aplicação acessível para todos os perfis de usuário, sem comprometer a experiência visual da maioria.
