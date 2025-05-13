#! /usr/bin/env sh
set -e

## START SCRIPT FOR DEVELOPMENT ##
## start the local development environment with this script

## set environment variables
gcloud config set project your_gcp_project_prod
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)
export ENVIRONMENT=dev

docker compose up temp_api -d --build
