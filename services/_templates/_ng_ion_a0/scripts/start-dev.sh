#! /usr/bin/env sh

set -e

## Starts and serves web app

docker compose up sqr_web
# docker compose up sqr_web --build
# docker compose up sqr_web --build --force-recreate
