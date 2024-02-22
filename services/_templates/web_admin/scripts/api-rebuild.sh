#! /usr/bin/env sh

set -e

# delete and recreate contennts of api folder using openapi-generator

sudo rm -rf services/web_admin/app/src/app/core/api/sqr
mkdir services/web_admin/app/src/app/core/api/sqr

# docker pull openapitools/openapi-generator-cli

docker run --rm \
  -v ${PWD}/services/web_admin/app/src/app/core/api/:/local \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.json \
  -g typescript-angular \
  -o /local/sqr/ \
  --skip-validate-spec

sudo chmod -R 777 services/web_admin/app/src/app/core/api/sqr
