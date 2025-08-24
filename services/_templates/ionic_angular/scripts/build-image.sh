#! /usr/bin/env sh

set -e

## this script is for building or rebuilding the image for the web app ##

docker compose build ionic_angular
# docker compose build ionic_angular --no-cache
# docker compose -f docker-compose.yml build ionic_angular --no-cache
