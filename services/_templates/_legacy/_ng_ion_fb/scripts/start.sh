#! /usr/bin/env sh

set -e

## Starts and serves web app

docker compose up web_app
# docker compose up web_app --build
# docker compose up web_app --build --force-recreate
