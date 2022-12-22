#! /usr/bin/env sh

set -e

# This runs app and a local database for local development

export ENVIRONMENT=devprod

docker compose down

docker compose up web api cloudsql-proxy
# docker compose up --build
# docker compose up --build --force-recreate
# docker compose logs -f

# echo 🖕
 