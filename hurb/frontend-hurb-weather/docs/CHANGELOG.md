# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## ⚠️ INSTRUÇÕES DE USO

**A cada etapa concluída do backlog, seguir este fluxo:**

### 1. Criar Nova Versão

```markdown
## [X.Y.Z] - YYYY-MM-DD

### ✨ Adicionado

[Liste tudo que foi adicionado]

### 🔧 Configurado

[Liste configurações feitas]

### 📊 Métricas

[Inclua dados relevantes: tamanhos, performance, etc.]

### ✅ Validado

[Liste testes e validações executadas]
```

### 2. Atualizar [Unreleased]

Mover items concluídos de `[Unreleased]` para a nova versão e atualizar lista de pendências.

### 3. Versionamento

- **MAJOR** (X.0.0): Mudanças incompatíveis
- **MINOR** (0.X.0): Novas funcionalidades compatíveis (cada ETAPA completa)
- **PATCH** (0.0.X): Correções de bugs

**Exemplo de versionamento deste projeto:**

- ETAPA 1 (Setup) → v0.1.0
- ETAPA 2 (Docker) → v0.2.0
- ETAPA 3 (Tipos) → v0.3.0
- ETAPA 4 (Utilitários) → v0.4.0
- ...
- ETAPA 13 (Documentação Final) → v1.0.0

### 4. Commit

```bash
git add docs/CHANGELOG.md docs/BACKLOG.md [outros arquivos]
git commit -m "feat/docs: [descrição]

[Detalhes]

Co-Authored-By: Claude Sonnet 4.5 <roberto.urias@gmail.com>"
```

---

## [Unreleased]

### Em desenvolvimento

- ETAPA 5 — Serviços de API
- ETAPA 6 — Custom Hooks

---

## [0.4.0] - 2026-05-12

### ✨ Adicionado

#### Utilitários (ETAPA 4)

**Conversão de Temperatura (`src/utils/temperature.ts`)**

- `celsiusToFahrenheit(c: number): number` — Converte Celsius para Fahrenheit
- `fahrenheitToCelsius(f: number): number` — Converte Fahrenheit para Celsius
- `formatTemperature(temp: number, unit: TemperatureUnit): string` — Formata temperatura com unidade

**Gradiente de Cor (`src/utils/gradient.ts`)**

- `getGradientTheme(temp: number | null): GradientTheme` — Retorna tema baseado na temperatura:
  - `null` → `'neutral'` (cinza)
  - `< 15°C` → `'cold'` (azul)
  - `15-35°C` → `'warm'` (amarelo)
  - `> 35°C` → `'hot'` (vermelho)

**Mapeamento de Ícones (`src/utils/icons.ts`)**

- `getMeteoconIcon(weatherCode: number): string` — Mapeia códigos OpenWeather para ícones Meteocons
- Cobertura completa de grupos:
  - 2xx: Tempestade → `cloud-flash`
  - 3xx: Garoa → `cloud-drizzle`
  - 5xx: Chuva → `cloud-rain` / `cloud-hail`
  - 6xx: Neve → `cloud-snow`
  - 7xx: Atmosfera → `cloud-fog`
  - 800: Céu limpo → `sun`
  - 80x: Nuvens → `cloud-sun` / `cloud`

**Formatação de Data (`src/utils/date.ts`)**

- `formatWeatherDate(dateStr: string): string` — Formata datas com labels amigáveis:
  - Dia atual → `'Hoje'`
  - Próximo dia → `'Amanhã'`
  - Dia seguinte → `'Depois de amanhã'`
  - Outros → Data formatada (ex: "sexta-feira, 15 de mai.")

**Export Centralizado (`src/utils/index.ts`)**

- Re-export de todas as funções utilitárias

**Testes Completos**

- `src/utils/__tests__/temperature.test.ts` — 15 testes
- `src/utils/__tests__/gradient.test.ts` — 7 testes
- `src/utils/__tests__/icons.test.ts` — 18 testes
- `src/utils/__tests__/date.test.ts` — 10 testes
- **Total:** 50 testes, todos passando

### 🔧 Configurado

**TypeScript**

- Path alias `@/*` atualizado para `./src/*`
- Compatibilidade com imports relativos e absolutos

### 📊 Métricas

**Cobertura de Testes**

- Utilitários: **93.33%** (meta: 90%+)
- Statements: 93.33%
- Branches: 97.67%
- Functions: 85.71%
- Lines: 93.33%

**Testes**

- 50 testes unitários
- 100% dos testes passando
- Tempo de execução: ~2s

### ✅ Validado

- ✅ Todas as funções utilitárias implementadas
- ✅ Cobertura de testes acima de 90%
- ✅ TypeScript sem erros
- ✅ Prettier aplicado
- ✅ Testes de conversão com valores extremos (-40°C, 0°C, 100°C)
- ✅ Testes de gradiente com bordas (15°C, 35°C)
- ✅ Testes de ícones com todos os grupos de clima
- ✅ Testes de data com timezone handling

### 📝 Notas Técnicas

**Funções Puras**

Todos os utilitários são funções puras (pure functions):

- ✅ Sem efeitos colaterais
- ✅ Mesmo input sempre gera mesmo output
- ✅ Não dependem de estado externo
- ✅ Fáceis de testar e debugar

**Conversão de Temperatura**

A fórmula de conversão usa precisão matemática:

- C → F: `(C × 9/5) + 32`
- F → C: `(F - 32) × 5/9`
- Ponto de convergência: `-40°C = -40°F`

**Mapeamento de Ícones**

O mapeamento segue a documentação oficial da OpenWeather API, com fallback para `'sun'` em casos desconhecidos, garantindo que a UI nunca quebre por falta de ícone.

---

## [0.3.0] - 2026-05-12

### ✨ Adicionado

#### Tipos TypeScript (ETAPA 3)

**Weather Types (`src/types/weather.ts`)**

- `OpenWeatherResponse` — Interface completa da resposta da API OpenWeather
- `OpenWeatherForecastItem` — Tipo para item individual de previsão
- `WeatherDay` — Tipo normalizado com dados essenciais:
  - `date: string` — Data da previsão
  - `temp: number` — Temperatura em Celsius
  - `feelsLike: number` — Sensação térmica
  - `description: string` — Descrição do tempo
  - `icon: string` — Código do ícone meteorológico

**Geocode Types (`src/types/geocode.ts`)**

- `OpenCageResponse` — Interface completa da resposta da API OpenCage
- `OpenCageResult` — Tipo para resultado individual de geocodificação
- `Coordinates` — Tipo simplificado para coordenadas:
  - `lat: number` — Latitude
  - `lng: number` — Longitude

**UI Types (`src/types/ui.ts`)**

- `TemperatureUnit` — Union type: `'C' | 'F'`
- `GradientTheme` — Union type: `'cold' | 'warm' | 'hot' | 'neutral'`

**Export Centralizado (`src/types/index.ts`)**

- Re-export de todos os tipos para facilitar imports
- Estrutura organizada por domínio (weather, geocode, ui)

### 🔧 Configurado

**TypeScript**

- Tipos completos para todas as APIs externas
- Strict typing habilitado para toda a aplicação
- Path alias `@/types` funcionando

### ✅ Validado

- ✅ Compilação TypeScript sem erros (`tsc --noEmit`)
- ✅ Tipos alinhados com documentação oficial das APIs
- ✅ Export centralizado funcionando
- ✅ Formatação Prettier aplicada

### 📝 Notas Técnicas

**Estrutura de Tipos**

Os tipos foram organizados em três camadas:

1. **Raw API Types** — Tipos que refletem exatamente a resposta das APIs externas
2. **Normalized Types** — Tipos simplificados para uso interno da aplicação
3. **UI Types** — Tipos para estado e preferências de interface

Essa separação permite:

- ✅ Type safety completo nas chamadas de API
- ✅ Flexibilidade para transformar dados sem quebrar contratos
- ✅ Facilita manutenção quando APIs mudam

---

## [0.2.0] - 2026-05-11

### ✨ Adicionado

#### Docker (ETAPA 2)

**Dockerfile Multi-Stage**

- `Dockerfile` com 4 stages otimizados:
  - `base` — Camada compartilhada com Node.js 20 Alpine
  - `development` — Ambiente de desenvolvimento com hot reload
  - `builder` — Build otimizado da aplicação
  - `production` — Runtime mínimo com usuário não-root

**Docker Compose**

- `docker-compose.yml` com dois perfis:
  - `dev` — Desenvolvimento com volumes para hot reload
  - `prod` — Produção com build standalone
- Containers nomeados: `hurb-weather-dev` e `hurb-weather-prod`
- Carregamento automático de `.env.local`
- Restart policy para produção (`unless-stopped`)

**Otimizações**

- `.dockerignore` completo para reduzir contexto de build
- Output standalone do Next.js habilitado
- Usuário não-root (`nextjs:nodejs` UID 1001) para segurança
- Volumes isolados para `node_modules` e `.next` no modo dev

**Documentação**

- `docs/DOCKER.md` com guia completo:
  - Comandos para dev e prod
  - Arquitetura multi-stage explicada
  - Troubleshooting comum
  - Exemplos de CI/CD
  - Comandos úteis de Docker

### 🔧 Configurado

**next.config.ts**

- `output: 'standalone'` para produção otimizada
- `images.remotePatterns` configurado para Bing (`www.bing.com/th**`)

### 📊 Métricas

**Tamanho das Imagens**

- Desenvolvimento: **959 MB**
- Produção: **187 MB** (~80% menor)

**Performance de Inicialização**

- Desenvolvimento: ~400ms (com compilação)
- Produção: <1ms (pré-compilado)

### ✅ Validado

- ✅ Build da imagem de desenvolvimento bem-sucedido
- ✅ Build da imagem de produção bem-sucedido
- ✅ Container de desenvolvimento acessível em http://localhost:3000
- ✅ Container de produção acessível em http://localhost:3000
- ✅ Hot reload funcionando no modo dev
- ✅ Standalone output gerando corretamente

---

## [0.1.0] - 2026-05-11

### ✨ Adicionado

#### Setup do Projeto (ETAPA 1)

**Framework e Ambiente**

- Next.js 16.2.6 com TypeScript 5.x
- App Router habilitado
- React 19.2.4 e React DOM 19.2.4
- ESLint 9.x com configuração Next.js
- Prettier 3.8.3 para formatação de código

**Estrutura de Diretórios**

- `src/components/` — Componentes React reutilizáveis
- `src/hooks/` — Custom hooks
- `src/services/` — Camada de comunicação com APIs externas
- `src/utils/` — Funções utilitárias puras
- `src/types/` — Definições de tipos TypeScript
- `src/styles/` — Tokens CSS e estilos globais
- `src/__mocks__/` — Mocks para testes (MSW handlers e server)
- `public/icons/` — Diretório para ícones Meteocons
- `tests/e2e/` — Testes end-to-end com Playwright

**Configuração de Testes**

- Jest 30.4.2 configurado com cobertura de código
- @testing-library/react 16.3.2 para testes de componentes
- @testing-library/jest-dom 6.9.1 para matchers customizados
- @testing-library/user-event 14.6.1 para simulação de interações
- jest-environment-jsdom 30.4.1 para ambiente de testes DOM
- ts-node 10.9.2 para execução de arquivos TypeScript no Jest
- MSW (Mock Service Worker) 2.14.6 para mock de APIs
- Playwright 1.60.0 para testes E2E
- Chromium instalado como navegador de teste

**Sistema de Design**

- `src/styles/tokens.css` com variáveis CSS:
  - Cores de gradiente por tema (cold, warm, hot, neutral)
  - Tipografia (família Inter + escalas de tamanho)
  - Espaçamento (escala de 0.25rem a 4rem)
  - Cores de texto e superfície

**Configurações de Desenvolvimento**

- `.prettierrc` com regras de formatação:
  - Semicolons habilitados
  - Single quotes
  - Print width: 100
  - Tab width: 2 espaços
  - Trailing comma: ES5
  - Arrow parens: always
- `.gitignore` completo para Node.js, Next.js, e ferramentas de teste
- `.env.example` com template de variáveis de ambiente
- `.env.local` criado (vazio, aguardando chaves de API)

**Scripts NPM**

- `dev` — Servidor de desenvolvimento Next.js
- `build` — Build de produção
- `start` — Servidor de produção
- `lint` — Verificação de código com ESLint
- `format` — Formatação automática com Prettier
- `format:check` — Verificação de formatação sem modificar
- `test` — Execução de testes unitários com Jest
- `test:watch` — Testes em modo watch
- `test:coverage` — Relatório de cobertura de testes
- `test:e2e` — Testes end-to-end com Playwright
- `test:e2e:ui` — Testes E2E com interface visual

**Arquivos de Configuração**

- `jest.config.ts` — Configuração Jest com suporte a TypeScript e CSS Modules
- `jest.setup.ts` — Setup global de testes com @testing-library/jest-dom
- `playwright.config.ts` — Configuração Playwright com servidor de desenvolvimento integrado
- `tsconfig.json` — Configuração TypeScript com path alias `@/*` → `src/*`
- `next.config.ts` — Configuração Next.js
- `eslint.config.mjs` — Configuração ESLint

**Testes Iniciais**

- `tests/e2e/smoke.spec.ts` — Teste E2E de smoke para validar setup

**Documentação**

- `CLAUDE.md` — Contexto do projeto para Claude Code
- `.claude/rules/coding-standards.md` — Padrões de código TypeScript/React
- `.claude/rules/testing.md` — Convenções de testes
- `docs/BACKLOG.md` — Plano de desenvolvimento em etapas
- `docs/CHALLENGE.md` — Especificação do desafio técnico
- `.env.example` — Template de variáveis de ambiente

### 🔧 Configurado

**Next.js**

- App Router habilitado
- CSS Modules como estratégia de estilo
- TypeScript strict mode
- Path alias `@/*` configurado
- Hot reload funcionando

**Jest**

- Ambiente de testes: jsdom
- Coverage provider: v8
- Transform ignore patterns para MSW/ESM
- Mapeamento de módulos para `@/*`
- Cobertura configurada para arquivos em `src/`

**Playwright**

- Navegador: Chromium (Desktop Chrome)
- Base URL: http://localhost:3000
- Servidor de desenvolvimento integrado
- Reporter: HTML
- Trace on first retry habilitado

**MSW**

- Handlers vazios em `src/__mocks__/handlers.ts`
- Server configurado em `src/__mocks__/server.ts`
- Documentação de uso incluída

### 📝 Notas Técnicas

**Decisões de Arquitetura**

- MSW não foi integrado ao `jest.setup.ts` globalmente para evitar problemas de compatibilidade ESM/CJS. Os testes que necessitarem de mock de API devem importar e configurar o server individualmente.
- Prettier configurado com `endOfLine: lf` para consistência entre ambientes Windows/Linux/Mac.
- TypeScript configurado com path alias `@/` apontando para `src/` para imports mais limpos.

**Variáveis de Ambiente Necessárias**

Para executar a aplicação, é necessário configurar as seguintes variáveis em `.env.local`:

```env
NEXT_PUBLIC_OPENWEATHER_APPID=sua_chave_openweather
NEXT_PUBLIC_OPENCAGE_API_KEY=sua_chave_opencage
```

**Próximos Passos**

- ETAPA 2: Configuração Docker (Dockerfile multi-stage + docker-compose)
- ETAPA 3: Definição de tipos TypeScript
- ETAPA 4: Implementação de utilitários (temperatura, gradiente, ícones, data)

---

## Formato do Changelog

### Tipos de Mudanças

- **✨ Adicionado** — Para novas funcionalidades
- **🔧 Configurado** — Para mudanças em configurações existentes
- **🔄 Modificado** — Para mudanças em funcionalidades existentes
- **🗑️ Removido** — Para funcionalidades removidas
- **🐛 Corrigido** — Para correções de bugs
- **🔒 Segurança** — Para correções de vulnerabilidades
- **📝 Notas Técnicas** — Para informações técnicas relevantes

---

[unreleased]: https://github.com/usuario/hurb-weather/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/usuario/hurb-weather/releases/tag/v0.1.0
