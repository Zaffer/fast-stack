#! /usr/bin/env sh

set -e

## delete and recreate contents of api folder using openapi-generator
## first pul openapi generator: `docker pull openapitools/openapi-generator-cli`
## copy openapi.json to /app/src/app/core/api/openapi.json

sudo rm -rf services/admin_web/app/src/app/core/api/backend
mkdir services/admin_web/app/src/app/core/api/backend


docker run --rm \
  -v ${PWD}/services/admin_web/app/src/app/core/api/:/local \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.json \
  -g typescript-angular \
  -o /local/backend/ \
  # --skip-validate-spec