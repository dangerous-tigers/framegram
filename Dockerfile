#Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

#Билдим приложение
#Кэширование зависимостей — если файлы в проекте изменились,
#но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
FROM node:20.11-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm build:production

#Стейдж запуска
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/ ./
RUN corepack enable && corepack prepare pnpm@latest --activate
EXPOSE 3000
CMD ["pnpm", "start"]