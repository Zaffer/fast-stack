#! /usr/bin/env sh

set -e

## this script is for building or rebuilding the image for the web app ##

docker compose build web_app
# docker compose build web_app --no-cache
# docker compose -f docker-compose.yml build web_app --no-cache
