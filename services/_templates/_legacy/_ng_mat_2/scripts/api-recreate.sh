#! /usr/bin/env sh

set -e

# delete and recreate contennts of api folder using openapi-generator

sudo rm -rf services/_ng_mat_2/app/src/app/core/api/nm2
mkdir services/_ng_mat_2/app/src/app/core/api/nm2

# docker pull openapitools/openapi-generator-cli

docker run --rm \
  -v ${PWD}/services/_ng_mat_2/app/src/app/core/api/:/local \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.json \
  -g typescript-angular \
  -o /local/nm2/ \
  --skip-validate-spec

  sudo chmod -R 777 services/_ng_mat_2/app/src/app/core/api/nm2