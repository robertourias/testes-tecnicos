# HURB — Weather Microsite

Microsite responsivo de previsão do tempo desenvolvido como desafio técnico para a **HURB**.

## Sobre o desafio

Construir um microsite que exibe a previsão do tempo para os próximos 3 dias (hoje, amanhã e depois de amanhã) com as seguintes características:

- Geolocalização automática ao abrir a página (via API do navegador + reverse geocode)
- Campo de texto para trocar a localidade manualmente
- Imagem de fundo do Bing atualizada diariamente
- Degradê dinâmico conforme a temperatura atual (azul < 15°C · amarelo 15–35°C · vermelho > 35°C)
- Alternância entre Celsius e Fahrenheit ao clicar nas temperaturas

Detalhes completos: [`docs/CHALLENGE.md`](./docs/CHALLENGE.md)

## Stack

- **Next.js 14+** (App Router) com TypeScript
- **CSS Modules**
- **Jest + Testing Library + MSW** (testes unitários e de integração)
- **Playwright** (testes E2E)
- **Docker** (multi-stage: development + production)

## Como executar

> Pré-requisito: Docker instalado.

```bash
# Copiar variáveis de ambiente
cp .env.example .env.local

# Subir a aplicação
docker compose --profile dev up
```

Acesse: [http://localhost:3000](http://localhost:3000)

Para mais opções (rodar localmente, testes, produção), consulte a documentação completa em [`docs/`](./docs/).
