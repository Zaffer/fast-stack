#! /usr/bin/env sh

set -e

# delete and recreate contennts of api folder using openapi-generator

sudo rm -rf services/md_web/app/src/app/core/api/
mkdir services/md_web/app/src/app/core/api/

# docker pull openapitools/openapi-generator-cli

# TODO need to fix
docker run --rm \
  -v ${PWD}/services/md_web/:/services/md_web/ openapitools/openapi-generator-cli generate \
  -i /services/md_web/app/openapi.json \
  -g typescript-angular \
  -o /services/md_web/app/src/app/core/api \
  --skip-validate-spec
