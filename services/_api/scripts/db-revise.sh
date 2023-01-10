#! /usr/bin/env sh
set -e

## CREATE AN ALEMBIC REVISION ##

## checks for active db connection before alembic upgrade
timeout 90s bash -c "until docker exec db-local pg_isready ; do echo '⌛'; sleep 5 ; done"; echo -e \\a

# docker exec -u fish -w /app/db api_container alembic revision --autogenerate
# docker exec -u fish -w /app/db api_container alembic revision --autogenerate -m "message"

# docker exec -u fish -w /app/db alembic upgrade head --sql > app/db/sql/base.sql
docker exec -u fish -w /app/db api_container alembic upgrade head --sql > services/_api/src/db/sql/base.sql

echo '🥐'
