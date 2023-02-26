#! /usr/bin/env sh
set -e

## START SCRIPT FOR DEVELOPMENT ##
# start the local development environment with this script
# make sure docker desktop is running

export ENVIRONMENT=dev
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)
# export GOOGLE_CLOUD_PROJECT=your_gcp_project_prod

docker compose up api -d

services/_api/scripts/db-up.sh

## follow all the logs are a specific service's logs
docker compose logs -f
# docker compose logs -f api

echo '🎂'
