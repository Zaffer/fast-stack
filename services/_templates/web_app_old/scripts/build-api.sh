#! /usr/bin/env sh

set -e

## this script is for building the API for the web app ##

# define which api to build
api="news"

# delete and recreate contennts of api folder using openapi-generator
sudo rm -rf services/_templates/web_app/src/src/app/core/api/$api
mkdir services/_templates/web_app/src/src/app/core/api/$api

# # you need download the generator image first time you run this script
# docker pull openapitools/openapi-generator-cli

docker run --rm \
  -v ${PWD}/services/_templates/web_app/src/src/app/core/api:/local \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.json \
  -g typescript-angular \
  -o /local/$api
  # --skip-validate-spec

chown -R $USER:$USER services/_templates/web_app/src/src/app/core/api