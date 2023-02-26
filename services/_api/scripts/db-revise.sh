#! /usr/bin/env sh
set -e

## CREATE AN ALEMBIC REVISION ##

## input revision name
read -p 'Revision name: ' revision_name

## checks for active db connection before alembic upgrade
timeout 90s bash -c "until docker exec db-local pg_isready ; do echo '⌛'; sleep 5 ; done"; echo -e \\a

## gerenate an sql file before upgrading the database to make sure the sql is correct
# docker exec -u root -w /app/db api_container alembic upgrade head --sql > services/_api/src/db/sql/base.sql

##  create the revision automatically based on the connected database
## NOTE always review the alembic version output python file, alembic is best effort and not perfect!
docker exec -u root -w /app/db api_container alembic revision --autogenerate -m $revision_name

echo '🔂'
