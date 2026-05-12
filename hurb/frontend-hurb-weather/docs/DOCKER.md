# Guia Docker — HURB Weather

Este documento descreve como executar a aplicação usando Docker.

---

## Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+

Verificar instalação:

```bash
docker --version
docker compose version
```

---

## Perfis Disponíveis

A aplicação possui dois perfis Docker:

### 🔧 `dev` — Desenvolvimento

- Hot reload habilitado
- Código fonte montado via volume
- Todas as dependências instaladas
- Node.js em modo development

### 🚀 `prod` — Produção

- Build otimizado com output standalone
- Imagem mínima (apenas runtime)
- Usuário não-root (nextjs:nodejs)
- Node.js em modo production

---

## Comandos

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
docker compose --profile dev up

# Reconstruir imagem e iniciar
docker compose --profile dev up --build

# Rodar em background
docker compose --profile dev up -d

# Ver logs
docker compose --profile dev logs -f

# Parar containers
docker compose --profile dev down
```

### Produção

```bash
# Build e iniciar servidor de produção
docker compose --profile prod up --build

# Rodar em background
docker compose --profile prod up -d

# Ver logs
docker compose --profile prod logs -f

# Parar containers
docker compose --profile prod down
```

---

## Variáveis de Ambiente

Antes de executar, preencha o arquivo `.env.local` com as chaves de API:

```env
NEXT_PUBLIC_OPENWEATHER_APPID=sua_chave_openweather
NEXT_PUBLIC_OPENCAGE_API_KEY=sua_chave_opencage
```

O Docker Compose carrega automaticamente esse arquivo via `env_file`.

---

## Arquitetura Multi-Stage

O `Dockerfile` utiliza build multi-stage para otimizar tamanho e segurança:

```
┌─────────────┐
│    base     │  ← Node.js 20 Alpine + package.json
└──────┬──────┘
       │
       ├─────────────────┐
       │                 │
┌──────▼─────────┐  ┌────▼────────┐
│  development   │  │   builder   │
│ (npm ci +      │  │ (npm build) │
│  npm run dev)  │  └──────┬──────┘
└────────────────┘         │
                     ┌─────▼─────────┐
                     │  production   │
                     │ (standalone)  │
                     └───────────────┘
```

### Stages

| Stage         | Uso                   | Tamanho |
| ------------- | --------------------- | ------- |
| `base`        | Camada compartilhada  | ~150 MB |
| `development` | Desenvolvimento local | ~600 MB |
| `builder`     | Build de produção     | ~700 MB |
| `production`  | Runtime otimizado     | ~200 MB |

---

## Volumes (Perfil dev)

No perfil `dev`, os seguintes volumes são montados:

```yaml
volumes:
  - .:/app # Código fonte (hot reload)
  - /app/node_modules # Isola node_modules do host
  - /app/.next # Isola cache do Next.js
```

Isso permite:

- ✅ Editar código no host e ver mudanças instantaneamente
- ✅ `node_modules` gerenciados pelo container (evita conflitos entre SO)
- ✅ Cache do Next.js isolado

---

## Portas

Ambos os perfis expõem a aplicação na porta **3000**:

```
http://localhost:3000
```

Para mudar a porta, edite o `docker-compose.yml`:

```yaml
ports:
  - '8080:3000' # Mapeia porta 8080 do host → 3000 do container
```

---

## Troubleshooting

### Container não inicia

**Problema:** Porta 3000 já em uso

```bash
# Verificar processos na porta 3000
netstat -ano | findstr :3000

# Parar processo (Windows)
taskkill /PID <PID> /F
```

**Solução alternativa:** Mudar porta no `docker-compose.yml`

### Hot reload não funciona (Windows)

**Problema:** Docker Desktop no Windows pode ter problemas com file watching

**Solução:** Adicionar ao `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
```

### Build falha com "ENOENT: .env.local"

**Problema:** Arquivo `.env.local` não existe

**Solução:** Criar `.env.local` com base no `.env.example`

### Imagem muito grande

**Problema:** Imagem de produção está ocupando muito espaço

**Solução:** Usar perfil `prod` (já otimizado com multi-stage)

```bash
# Verificar tamanho das imagens
docker images | grep hurb-weather

# Limpar imagens antigas
docker image prune -a
```

---

## Comandos Úteis

```bash
# Entrar no container em execução (dev)
docker compose --profile dev exec app-dev sh

# Entrar no container em execução (prod)
docker compose --profile prod exec app-prod sh

# Ver logs em tempo real
docker compose logs -f

# Reconstruir sem cache
docker compose build --no-cache

# Remover tudo (containers, volumes, redes)
docker compose down -v

# Ver uso de recursos
docker stats
```

---

## Segurança (Perfil prod)

O perfil de produção implementa boas práticas de segurança:

- ✅ **Usuário não-root:** Container roda como `nextjs:nodejs` (UID 1001)
- ✅ **Imagem mínima:** Alpine Linux (menor superfície de ataque)
- ✅ **Multi-stage:** Build artifacts não vão para produção
- ✅ **Standalone output:** Apenas dependências runtime são copiadas

---

## CI/CD

Exemplo de pipeline GitHub Actions:

```yaml
name: Docker Build

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build production image
        run: docker compose --profile prod build
      - name: Test production container
        run: |
          docker compose --profile prod up -d
          sleep 5
          curl --fail http://localhost:3000 || exit 1
```

---

## Próximos Passos

- [ ] Configurar health checks no `docker-compose.yml`
- [ ] Adicionar nginx como reverse proxy
- [ ] Implementar logs estruturados (JSON)
- [ ] Configurar monitoring com Prometheus
