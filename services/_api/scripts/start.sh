#! /usr/bin/env sh
set -e

## START THE SERVERS FOR DEVELOPMENT ##
# run in your python virtual environment
# make sure docker compose is running

export ENVIRONMENT=dev

docker compose up -d lw_api

services/_api/scripts/migrate-database.sh
