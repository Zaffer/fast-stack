#! /usr/bin/env sh
set -e

## CHECK DATABASE IS READY AND UPGRADE TO LATEST VERSION ##

# # build the image again with no cache
# docker compose build grafana --no-cache

docker compose up db-local -d
services/_templates/grafana/scripts/db-up.sh

# docker compose up grafana -d
docker compose up grafana --build -d

echo '📊⬆️ grafana upped'

