#! /usr/bin/env sh
set -e

## UPGRADE THE DATABASE TO LATEST REVISION ##

docker exec -u fish -w /app/db api_service alembic upgrade head

# # manually add sql into the container to execute
# docker cp ./_api/db/sql/data.sql local-db:/docker-entrypoint-initdb.d/data.sql
# docker exec -u postgres local-db psql postgres postgres -f docker-entrypoint-initdb.d/data.sql

echo '🍞'
