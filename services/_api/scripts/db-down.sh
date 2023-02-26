#! /usr/bin/env sh
set -e

## DOWNGRADE THE DATABASE TO LATEST REVISION ##

# checks for active db connection before alembic upgrade
timeout 30s bash -c "until docker exec local-db pg_isready ; do echo '⌛'; sleep 3 ; done"; echo -e \\a

# execute the alembic down grade inside the container
docker exec -u monkey -w /app/db qrs_api_container alembic downgrade -1

echo '⬇️'