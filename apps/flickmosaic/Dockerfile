# apps/flickmosaic/Dockerfile
# Monorepo-friendly multi-stage build

FROM node:22.13.0-alpine AS base
ENV COREPACK_ENABLE_STRICT=0
RUN corepack enable
RUN corepack prepare pnpm@10.15.1 --activate
RUN apk add --no-cache libc6-compat

# Stage 2: Install ALL dependencies (full monorepo)
FROM base AS deps
WORKDIR /app

# Copy entire monorepo for dependency installation
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 3: Build application
FROM base AS builder
WORKDIR /app

# Copy everything from deps (includes node_modules)
COPY --from=deps /app ./

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

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/flickmosaic/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/apps/flickmosaic/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/flickmosaic/.next/static ./apps/flickmosaic/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "apps/flickmosaic/server.js"]
