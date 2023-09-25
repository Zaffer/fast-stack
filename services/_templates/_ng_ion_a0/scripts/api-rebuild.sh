#! /usr/bin/env sh

set -e

# delete and recreate contennts of api folder using openapi-generator

sudo rm -rf services/sqr_web/app/src/app/core/api/sqr
mkdir services/sqr_web/app/src/app/core/api/sqr

# docker pull openapitools/openapi-generator-cli

docker run --rm \
  -v ${PWD}/services/sqr_web/app/src/app/core/api/:/local \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.json \
  -g typescript-angular \
  -o /local/sqr/ \
  --skip-validate-spec

sudo chmod -R 777 services/sqr_web/app/src/app/core/api/sqr