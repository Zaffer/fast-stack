#! /usr/bin/env sh

set -e

## Starts and serves web app connected to production backend

docker compose up ionic_angular_project_firebase

## start angular app in prod mode

# cd services/_templates/ionic_angular/src/
# ng serve --prod
# ng serve --prod --host