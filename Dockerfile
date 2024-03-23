# Stage 1: install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
ADD package*.json ./
RUN npm install

# Stage 2: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ADD . .
RUN npm run build

# Stage 3: run
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["npm", "run", "start"]
