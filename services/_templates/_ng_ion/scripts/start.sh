#! /usr/bin/env sh

set -e

## Starts and serves web app

docker compose up digest_web
# docker compose up digest_web --build
# docker compose up digest_web --build --force-recreate
