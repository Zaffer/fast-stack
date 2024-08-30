#! /usr/bin/env sh
set -e

## UPGRADE THE DATABASE TO LATEST REVISION ##

# Source the utilities script
. services/qrs_api/scripts/db-utils.sh

# wait for the database server to be ready
check_pg_server

# execute the alembic up grade inside the container
docker exec -u fish -w /app/db qrs_api_container alembic downgrade -1

echo '⬇️'
