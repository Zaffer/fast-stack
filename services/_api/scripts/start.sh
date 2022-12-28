#! /usr/bin/env sh
set -e

## START THE CONTAINERS & UP DATABASE ##
# run in your python virtual environment
# make sure docker is running
# be sure to set the ENVIROMENT variable

export GOOGLE_APPLICATION_CREDENTIALS=/tmp/keys/application_default_credentials.json
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)

docker compose down

docker compose up -d api

echo '🍩'
