#! /usr/bin/env sh
set -e

## CHECK DATABASE IS READY ##

# Source the utilities script
. ./utils.sh

# wait for the database server to be ready
check_pg_server

# check each database and create if doesn't exist
check_db_or_create "grafana"

echo '🐘⬆️ db upped'