#! /usr/bin/env sh

set -e

## Starts and serves web app connected to production backend

docker compose up web_app_project_firebase

## start angular app in prod mode

# cd services/_templates/web_app/src/
# ng serve --prod
# ng serve --prod --host