#! /usr/bin/env sh

set -e

## Starts and serves web app

docker compose up web_admin -d
# docker compose up web_admin --build
# docker compose up web_admin --build --force-recreate
