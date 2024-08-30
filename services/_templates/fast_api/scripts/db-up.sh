#! /usr/bin/env sh
set -e

## CHECK DATABASE IS READY AND UPGRADE TO LATEST VERSION ##

# Source the utilities script
. services/_fast_api/scripts/db-utils.sh

# wait for the database server to be ready
check_pg_server

# check each database and create if doesn't exist
check_db_or_create "postgres"
check_db_or_create "grafana"

# execute the alembic up grade inside the container
docker exec -u fish -w /app/db temp_api_container alembic upgrade head

# # manually add sql into the container to execute
# docker cp ./services/_fast_api/src/db/sql/data.sql local-db:/docker-entrypoint-initdb.d/data.sql
# docker exec -u postgres local-db psql postgres postgres -f docker-entrypoint-initdb.d/data.sql

echo '⬆️'
