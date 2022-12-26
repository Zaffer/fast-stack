#! /usr/bin/env sh
set -e

## START THE SERVERS FOR DEVELOPMENT ##
# run in your python virtual environment
# make sure docker compose is running

export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)

docker compose down

docker compose up -d api

services/_api/scripts/up-db.sh
