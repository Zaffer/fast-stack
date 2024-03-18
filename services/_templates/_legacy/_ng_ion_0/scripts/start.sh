#! /usr/bin/env sh

set -e

export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)

services/_templates/_ng_ion/scripts/install.sh

# docker compose up web
docker compose up temp_ng_ion -d
