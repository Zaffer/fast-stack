#! /usr/bin/env sh
set -e

## checks for active db connection then runs alembic upgrade
timeout 90s bash -c "until docker exec db-local pg_isready ; do echo '⌛'; sleep 5 ; done"; echo -e \\a

# "Permissin denied" error means you are not running this script inside your virtual environment
docker exec -u fish -w /app/db api_service alembic upgrade head
# docker exec -u root alembic upgrade head

# NOTE the sql can be run from anywhere, copying into entrypoint is for container start to auto run
docker cp ./_api/db/sql/data.sql local-db:/docker-entrypoint-initdb.d/data.sql
docker exec -u postgres local-db psql postgres postgres -f docker-entrypoint-initdb.d/data.sql

echo '🍞'
