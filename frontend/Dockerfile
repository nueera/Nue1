# ============================================================================
# NueOne Frontend — Multi-stage Docker Build
# ============================================================================
# Stage 1: Install dependencies with Bun
# Stage 2: Build Next.js production bundle
# Stage 3: Run with minimal standalone output
# ============================================================================

# ── Stage 1: Dependencies ──────────────────────────────────────────────────
FROM oven/bun:1 AS deps
WORKDIR /app

COPY package.json bun.lock* package-lock.json* ./

# Install dependencies
RUN if [ -f bun.lock ]; then \
      bun install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      bun install; \
    fi

# ── Stage 2: Build ─────────────────────────────────────────────────────────
FROM oven/bun:1 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time environment variables
ENV NEXT_PUBLIC_API_URL=http://backend:8000/api/v1
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# ── Stage 3: Production ────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
