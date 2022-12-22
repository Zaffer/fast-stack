#! /usr/bin/env sh
set -e

## checks for active db connection then runs alembic upgrade

timeout 90s bash -c "until docker exec local-db pg_isready ; do echo '⌛'; sleep 5 ; done"; echo -e \\a

cd services/_db/

# "Permissin denied" error means you are not running this script inside your virtual environment
docker exec -u fish alembic upgrade head

# NOTE the sql can be run from anywhere, copying into entrypoint is for container start to auto run
docker cp ./sql/A_data.sql local-db:/docker-entrypoint-initdb.d/A_data.sql
docker exec -u postgres local-db psql postgres postgres -f docker-entrypoint-initdb.d/A_data.sql

echo '🍞'
