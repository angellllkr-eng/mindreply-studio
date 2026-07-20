# Multi-stage build for TanStack Start + Express backend
# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy frontend files
COPY package.json pnpm-lock.yaml* yarn.lock* package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

# Copy source
COPY . .

# Build frontend with Vite
RUN npm run build

# Stage 2: Runtime - backend + SSR frontend
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy built frontend and dependencies from builder
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/dist ./dist
COPY --from=frontend-builder /app/package.json ./package.json

# Copy backend source (Express server + MCP)
COPY server/ ./server/

# Environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/index.js"]
