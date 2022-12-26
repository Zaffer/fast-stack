#! /usr/bin/env sh
set -e

export ENVIRONMENT=dev
# export ENVIRONMENT=proxy
# export ENVIRONMENT=prod

# Build the images
docker compose down

docker compose build api
# docker compose build api --no-cache
# docker compose -f docker-compose.yml up --build

echo '👍'
