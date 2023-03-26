#! /usr/bin/env sh
set -e

## START SCRIPT FOR DEVELOPMENT ##
# start the local development environment with this script
# make sure docker desktop is running

export ENVIRONMENT=dev
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)
# export GOOGLE_CLOUD_PROJECT=your_gcp_project_prod

docker compose up db-local -d
docker compose up temp_api -d
# docker compose up temp_api -d --build

services/_templates/_fast_api/scripts/db-up.sh

## manually add sql into the container to execute
docker cp services/_templates/_fast_api/src/db/sql/data.sql db-local:/docker-entrypoint-initdb.d/data.sql
docker exec -u postgres db-local psql db postgres -f docker-entrypoint-initdb.d/data.sql

## follow all the logs or a specific service's logs
docker compose logs -f
# docker compose logs -f api
