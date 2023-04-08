#! /usr/bin/env sh

set -e

# delete and recreate contennts of api folder using openapi-generator

sudo rm -rf services/_templates/_ng_ion/app/src/app/core/api/
mkdir services/qrs_web_3/app/src/app/core/api

# docker pull openapitools/openapi-generator-cli

docker run --rm \
  -v ${PWD}/services/_templates/_ng_ion/app/src/app/core/api/:/local \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.json \
  -g typescript-angular \
  -o /local/api/ \
  --skip-validate-spec