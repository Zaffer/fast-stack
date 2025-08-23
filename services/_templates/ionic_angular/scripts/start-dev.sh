#! /usr/bin/env sh

set -e

## Starts and serves web app for local development

# docker compose up ionic_angular
docker compose up ionic_angular -d
# docker compose up ionic_angular --build
# docker compose up ionic_angular --build --force-recreate

# firebase use ionic_angular
# firebase emulators:start --only auth