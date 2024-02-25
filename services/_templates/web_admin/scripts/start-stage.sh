#! /usr/bin/env sh

set -e

# export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)

# placeholder for figuring out how to run with different environments, probably need to add a build arg to the docker-compose.yml and set the ENV here.
docker compose up -d _ng_mat_3 --command "ionic serve --external --configuration=staging"
