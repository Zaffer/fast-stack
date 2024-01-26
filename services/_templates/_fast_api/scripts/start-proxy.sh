#! /usr/bin/env sh
set -e

## START SCRIPT FOR DEVELOPMENT ##
# start the local development environment but connected to production database

export ENVIRONMENT=proxy
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)
# export GOOGLE_CLOUD_PROJECT=your_gcp_project_prod

docker compose up temp_api -d --build