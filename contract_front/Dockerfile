# Etapa 1: Construção da aplicação
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN yarn
COPY . .
RUN yarn run build

# Etapa 2: Executando a aplicação com uma imagem leve
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 443
CMD ["yarn", "run", "start"]