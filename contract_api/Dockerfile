# Etapa 1: Instalar dependências em uma imagem leve
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

# Etapa 2: Construir a aplicação
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Etapa 3: Criar uma imagem final para produção
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 443
CMD ["node", "dist/main"]