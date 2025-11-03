# apps/flickmosaic/Dockerfile
# Multi-stage build for production optimization

# Stage 1: Base image with pnpm
FROM node:22.13.0-alpine AS base
ENV COREPACK_ENABLE_STRICT=0
RUN corepack enable
RUN corepack prepare pnpm@10.15.1 --activate
RUN apk add --no-cache libc6-compat

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY apps/flickmosaic/package.json ./apps/flickmosaic/

# Install dependencies
RUN pnpm install --frozen-lockfile --prefer-offline

# Stage 3: Build application
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/flickmosaic/node_modules ./apps/flickmosaic/node_modules

# Copy source code
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_TMDB_API_KEY
ARG NEXT_PUBLIC_TMDB_BASE_URL
ARG NEXT_PUBLIC_TMDB_IMAGE_URL

ENV NEXT_PUBLIC_TMDB_API_KEY=$NEXT_PUBLIC_TMDB_API_KEY
ENV NEXT_PUBLIC_TMDB_BASE_URL=$NEXT_PUBLIC_TMDB_BASE_URL
ENV NEXT_PUBLIC_TMDB_IMAGE_URL=$NEXT_PUBLIC_TMDB_IMAGE_URL

# Build with turbo
RUN pnpm turbo run build --filter=flickmosaic

# Stage 4: Production runner
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/apps/flickmosaic/public ./public

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/flickmosaic/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/flickmosaic/.next/static ./apps/flickmosaic/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "apps/flickmosaic/server.js"]
