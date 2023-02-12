#! /usr/bin/env sh
set -e

## UPGRADE THE DATABASE TO LATEST REVISION ##

## checks for active db connection before alembic upgrade
timeout 30s bash -c "until docker exec db-local pg_isready ; do echo '⌛'; sleep 3 ; done"; echo -e \\a

## create the database if not exists
if docker exec -u postgres db-local psql postgres postgres -c "CREATE DATABASE db;"; then
    # echo "created database because did not exist"

    ## if the database was created, then wait for the db to be ready
    timeout 30s bash -c "until docker exec db-local psql db postgres -c '' ; do echo '⌛'; sleep 3 ; done"; echo -e \\a
    # echo "created database ready for connections"
fi

## execute the alembic up grade inside the container
docker exec -u fish -w /app/db api_container alembic upgrade head

## manually add sql into the container to execute
# docker cp ./_api/db/sql/data.sql local-db:/docker-entrypoint-initdb.d/data.sql
# docker exec -u postgres local-db psql postgres postgres -f docker-entrypoint-initdb.d/data.sql

echo '🍞'
