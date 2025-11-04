# apps/flickmosaic/Dockerfile
# Multi-stage build with proper static file handling

FROM node:22.13.0-alpine AS base
RUN npm install -g pnpm@10.15.1
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./

ARG NEXT_PUBLIC_TMDB_API_KEY
ARG NEXT_PUBLIC_TMDB_BASE_URL
ARG NEXT_PUBLIC_TMDB_IMAGE_URL

ENV NEXT_PUBLIC_TMDB_API_KEY=$NEXT_PUBLIC_TMDB_API_KEY
ENV NEXT_PUBLIC_TMDB_BASE_URL=$NEXT_PUBLIC_TMDB_BASE_URL
ENV NEXT_PUBLIC_TMDB_IMAGE_URL=$NEXT_PUBLIC_TMDB_IMAGE_URL

RUN pnpm turbo run build --filter=flickmosaic

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone server files
COPY --from=builder --chown=nextjs:nodejs /app/apps/flickmosaic/.next/standalone ./

# Copy static assets - CRITICAL for CSS/JS!
RUN mkdir -p ./apps/flickmosaic/.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/flickmosaic/.next/static ./apps/flickmosaic/.next/static

# Copy public folder - for static assets like images, favicon
RUN mkdir -p ./apps/flickmosaic/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/flickmosaic/public ./apps/flickmosaic/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "apps/flickmosaic/server.js"]