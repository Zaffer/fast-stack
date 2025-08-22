FROM oven/bun:alpine AS base

# Install global CLI tools
# Installing Ionic CLI from GitHub to get angular-standalone support
RUN bun add -g @angular/cli@latest @ionic/cli @ionic/angular@latest firebase-tools@latest

WORKDIR /app

# Copy package files first for better layer caching
COPY ./web/package.json ./web/bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY ./web .

# Switch to non-root user for security
USER bun

# Start the application (using bun instead of yarn)
# CMD ["bun", "run", "start", "--", "--host", "0.0.0.0"]
