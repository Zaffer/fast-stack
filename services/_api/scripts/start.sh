#! /usr/bin/env sh
set -e

## START THE CONTAINERS ##
# make sure docker is running
# be sure to set the ENVIROMENT variable, else default is dev

export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)
export POSTGRES_DB=_db

# docker compose down

docker compose up api -d

echo '🍩'
