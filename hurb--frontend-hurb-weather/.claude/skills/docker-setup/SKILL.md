# Skill: Docker Setup

## Descrição

Workflow para configurar ou atualizar o ambiente Docker do projeto, garantindo que a aplicação rode corretamente em containers de desenvolvimento e produção.

## Gatilho

Usar quando:

- Configurar Docker pela primeira vez
- Atualizar dependências que afetam a imagem
- Trocar versão do Node
- Adicionar novos serviços ao `docker-compose.yml`
- Solucionar problemas de build/container

## Passos

### 1. Verificar Pré-requisitos

```bash
docker --version        # >= 24.x
docker compose version  # >= 2.x
node --version          # >= 20.x
```

### 2. Criar .dockerignore

```
node_modules
.next
.git
.env.local
.env
coverage
playwright-report
__tests__
.claude
*.md
!README.md
```

> **Importante:** `.dockerignore` bem configurado reduz drasticamente o tamanho do contexto de build.

### 3. Criar Dockerfile Multi-Stage

Copiar a estrutura do `AGENT.md` do DevOps agent e adaptar se necessário.

Pontos críticos:

- Base: `node:20-alpine` (imagem menor)
- Stage `development`: inclui `devDependencies`, monta volume
- Stage `builder`: roda `npm run build` com `output: 'standalone'`
- Stage `production`: apenas arquivos do `.next/standalone` (sem `node_modules` completo)

### 4. Criar docker-compose.yml

Referência no `AGENT.md` do DevOps agent.

### 5. Configurar next.config.ts

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.bing.com' }],
  },
};
```

### 6. Copiar .env.example → .env.local

O usuário deve fazer isso manualmente:

```bash
cp .env.example .env.local
# Editar .env.local com as chaves reais
```

### 7. Validar Build

```bash
# Testar stage de desenvolvimento
docker compose --profile dev up --build

# Em outro terminal, verificar resposta
curl http://localhost:3000

# Testar stage de produção
docker compose --profile dev down
docker compose --profile prod up --build
curl http://localhost:3000

# Verificar tamanho das imagens
docker images | grep hurb
```

### 8. Troubleshooting Comum

| Problema                       | Causa Provável                       | Solução                                         |
| ------------------------------ | ------------------------------------ | ----------------------------------------------- |
| `ENOENT: .env.local`           | Arquivo não criado                   | Copiar `.env.example` para `.env.local`         |
| Build falha em `npm run build` | Erro de TypeScript                   | Rodar `npm run build` localmente para ver erros |
| Página em branco               | Variável de env ausente no container | Verificar `env_file` no compose                 |
| Hot reload não funciona        | Volume não montado                   | Verificar `volumes:` no compose dev             |
| Imagem muito grande            | `.dockerignore` mal configurado      | Verificar se `node_modules` está excluído       |

### 9. Checklist Final

- [ ] `docker compose up` inicia sem erros
- [ ] Aplicação responde em `http://localhost:3000`
- [ ] Variáveis de ambiente chegam corretamente ao app
- [ ] Stage dev com hot reload funcionando
- [ ] Stage prod com build otimizado
- [ ] Imagem de produção < 500MB
- [ ] `.env.local` **não** commitado (verificar `.gitignore`)
- [ ] `.env.example` atualizado com todas as variáveis necessárias
