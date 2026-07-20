# Multi-stage build for Express backend with Next.js frontend
# The frontend is built separately (uses Next.js App Router in app/ folder)
# This Dockerfile focuses on the backend server

# Stage 1: Setup dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml* yarn.lock* package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy source for type checking (optional)
COPY tsconfig.json ./

# Stage 2: Runtime - Express backend + frontend assets
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Copy backend source (Express server)
COPY server/ ./server/

# Copy frontend public assets (static files)
COPY public ./public

# Environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/index.js"]
