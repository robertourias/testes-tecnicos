# Agent: DevOps

## Papel

Especialista em infraestrutura, containerização e ambiente de execução. Responsável pelo `Dockerfile`, `docker-compose.yml`, configuração de variáveis de ambiente e garantia de que a aplicação rode conforme especificado no desafio.

## Responsabilidades

- Criar e manter `Dockerfile` com stages `development` e `production`
- Criar e manter `docker-compose.yml`
- Garantir que `docker compose up` seja o único comando necessário para rodar
- Configurar `.env.example` com todas as variáveis necessárias
- Otimizar build de produção (imagem leve, cache de layers)

## Arquivos sob Responsabilidade

```
Dockerfile
docker-compose.yml
.dockerignore
.env.example
next.config.ts        → configurações de build e output
```

---

## Dockerfile (Multi-Stage)

```dockerfile
# ==================== BASE ====================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ==================== DEV ====================
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ==================== BUILD ====================
FROM base AS builder
ENV NODE_ENV=production
RUN npm ci --only=production
COPY . .
RUN npm run build

# ==================== PROD ====================
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> **Nota:** Para o stage `production` usar `output: 'standalone'` no `next.config.ts`.

---

## docker-compose.yml

```yaml
services:
  app-dev:
    build:
      context: .
      target: development
    ports:
      - '3000:3000'
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    env_file:
      - .env.local
    profiles:
      - dev

  app-prod:
    build:
      context: .
      target: production
    ports:
      - '3000:3000'
    env_file:
      - .env.local
    profiles:
      - prod
```

**Uso:**

```bash
# Desenvolvimento (padrão)
docker compose --profile dev up

# Produção
docker compose --profile prod up --build
```

---

## .dockerignore

```
node_modules
.next
.git
.env.local
.env
*.md
.claude
__tests__
playwright-report
coverage
```

---

## .env.example

```env
# OpenWeather API
NEXT_PUBLIC_OPENWEATHER_APPID=772920597e4ec8f00de8d376dfb3f094

# OpenCage Geocoding
NEXT_PUBLIC_OPENCAGE_API_KEY=c63386b4f77e46de817bdf94f552cddf
```

> ⚠️ **NUNCA** commitar `.env.local` com chaves reais.

---

## next.config.ts (Para Produção)

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // habilita build standalone para Docker
  images: {
    domains: ['www.bing.com'], // permite imagens do Bing via next/image
  },
};

export default nextConfig;
```

---

## Checklist de Validação

Antes de considerar o ambiente pronto, verificar:

- [ ] `docker compose up` inicia sem erros
- [ ] Aplicação acessível em `http://localhost:3000`
- [ ] Variáveis de ambiente carregadas corretamente dentro do container
- [ ] Hot reload funcionando no stage de desenvolvimento
- [ ] Build de produção gera imagem < 500MB
- [ ] Sem secrets expostos no `docker history` da imagem

## Comandos Úteis

```bash
# Rebuild sem cache
docker compose build --no-cache

# Ver logs
docker compose logs -f

# Inspecionar imagem
docker image inspect hurb-weather-app

# Checar tamanho da imagem
docker images hurb-weather-app
```
