#! /usr/bin/env sh
set -e

# Function to check if the PostgreSQL server is running
check_pg_server() {
    timeout 30s bash -c "until docker exec db-local pg_isready ; do echo '⌛'; sleep 3 ; done"; echo -e \\a
}

# Function to create a database if it doesn't exist, and wait for it to be ready
check_db_or_create() {
    local db_name=$1

    if docker exec -u postgres db-local psql postgres postgres -c "CREATE DATABASE $db_name;" 2>/dev/null; then
        timeout 30s bash -c "until docker exec db-local psql $db_name postgres -c '' ; do echo '⌛'; sleep 3 ; done"; echo -e \\a
        echo "created database $db_name"
    else
        echo "$db_name database exists"
    fi
}