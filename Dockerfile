# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Generar Prisma Client y compilar aplicación
RUN npm run prisma:generate
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias desde builder
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar prisma schema y archivos compilados desde builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY prisma ./prisma

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

USER nestjs

# Exponer puerto
EXPOSE 3000

CMD ["node", "dist/main"]
