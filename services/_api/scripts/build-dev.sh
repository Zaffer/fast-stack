#! /usr/bin/env sh
set -e

# Build the images

docker compose down

docker compose build _api
# docker compose build --no-cache
# docker compose -f docker-compose.yml up --build

echo '👍'
