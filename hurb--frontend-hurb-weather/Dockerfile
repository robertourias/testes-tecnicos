# ==========================================
# STAGE: base
# Base image com Node.js
# ==========================================
FROM node:20-alpine AS base

WORKDIR /app

# Instalar dependências apenas se package.json mudar
COPY package.json package-lock.json ./

# ==========================================
# STAGE: development
# Ambiente de desenvolvimento com hot reload
# ==========================================
FROM base AS development

# Instalar todas as dependências (incluindo devDependencies)
RUN npm ci

# Copiar código fonte
COPY . .

# Expor porta do servidor de desenvolvimento
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]

# ==========================================
# STAGE: builder
# Build da aplicação para produção
# ==========================================
FROM base AS builder

# Instalar todas as dependências para o build
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação Next.js com output standalone
RUN npm run build

# ==========================================
# STAGE: production
# Imagem otimizada para produção
# ==========================================
FROM node:20-alpine AS production

WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar apenas os arquivos necessários do builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Trocar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Variável de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar o servidor de produção
CMD ["node", "server.js"]
