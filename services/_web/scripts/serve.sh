#! /usr/bin/env sh

set -e

# ng serve the web app

docker compose up md_web --build

docker compose exec md_web yarn ng serve
