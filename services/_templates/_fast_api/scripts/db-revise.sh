#! /usr/bin/env sh
set -e

## CREATE AN ALEMBIC REVISION ##

# Source the utilities script
. services/qrs_api/scripts/db-utils.sh

# wait for the database server to be ready
check_pg_server

# input revision name
read -p 'revision_name (no spaces): ' revision_name

# create the revision automatically based on the connected database
docker exec -u root -w /app/db qrs_api_container alembic revision --autogenerate -m $revision_name
# NOTE always review the alembic version output python file, alembic is best effort and not perfect!

## gerenate an sql file before upgrading the database to make sure the sql is correct
# docker exec -u root -w /app/db api_container alembic upgrade head --sql > services/_api/src/db/sql/base.sql

echo '🔄️'
