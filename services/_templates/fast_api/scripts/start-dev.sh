#! /usr/bin/env sh
set -e

## START SCRIPT FOR DEVELOPMENT ##
## start the local development environment with this script

## set environment variables
gcloud config set project your_gcp_project_prod
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)
export ENVIRONMENT=dev

docker compose up temp_api -d --build

services/_templates/_fast_api/scripts/db-up.sh

## manually add sql into the container to execute
docker cp services/_templates/_fast_api/src/db/sql/data.sql db-local:/docker-entrypoint-initdb.d/data.sql
docker exec -u postgres db-local psql db postgres -f docker-entrypoint-initdb.d/data.sql
