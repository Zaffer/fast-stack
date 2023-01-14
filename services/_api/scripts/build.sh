#! /usr/bin/env sh
set -e

## BUILD / RE-BUILD THE DOCKER IMAGES SCRIPT ##

export ENVIRONMENT=dev
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)

docker compose down
# docker volume prune -f

docker compose build api

echo '🔨'
