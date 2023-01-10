#! /usr/bin/env sh
set -e

## UPGRADE THE DATABASE TO LATEST REVISION ##

# # checks for active db connection before alembic upgrade
timeout 90s bash -c "until docker exec db-local pg_isready ; do echo '⌛'; sleep 5 ; done"; echo -e \\a

docker exec -u fish -w /app/db api_container alembic upgrade head

# # manually add sql into the container to execute
# docker cp ./_api/db/sql/data.sql local-db:/docker-entrypoint-initdb.d/data.sql
# docker exec -u postgres local-db psql postgres postgres -f docker-entrypoint-initdb.d/data.sql

echo '🍞'
