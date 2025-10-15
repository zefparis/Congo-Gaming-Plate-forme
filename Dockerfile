# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm@10.18.2

# Set working directory
WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

# Copy package.json files
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web ./apps/web

# Build the application
WORKDIR /app/apps/web
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Install pnpm in production stage
RUN npm install -g pnpm@10.18.2

# Copy necessary files from builder
COPY --from=base /app/apps/web/.next ./apps/web/.next
COPY --from=base /app/apps/web/public ./apps/web/public
COPY --from=base /app/apps/web/package.json ./apps/web/package.json
COPY --from=base /app/apps/web/next.config.mjs ./apps/web/next.config.mjs
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
WORKDIR /app/apps/web
CMD ["pnpm", "start"]
