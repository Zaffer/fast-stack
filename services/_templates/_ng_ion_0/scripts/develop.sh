#! /usr/bin/env sh

set -e

export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)

# docker compose up web
docker compose up temp_ng_ion
