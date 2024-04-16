#! /usr/bin/env sh

set -e

## Starts and serves web app for local development

docker compose up web_app
# docker compose up web_app -d
# docker compose up web_app --build
# docker compose up web_app --build --force-recreate


## NOTE this move do start.sh script, but might need use project_name still
# cd services/web_app/app/

# firebase use web_app
# firebase emulators:start --only auth