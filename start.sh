#! /usr/bin/env sh
set -e

## START SCRIPT COLLECTION ##
# comment out and uncomment each line as needed


## DEVELOPMENT TOOLS ##
# docker compose up db-local -d ## Postgres local database
# docker compose up pgadmin -d ## PGAdmin
# docker compose up cloudsql -d ## CloudSQL Proxy
docker compose up firebase -d ## Firebase Emulator Suite


## MAIN APPLICATIONS ##
# sh services/_api/scripts/start-dev.sh ## backend
sh services/_templates/web_app/scripts/start-dev.sh ## user frontend
# sh services/_templates/web_admin/scripts/start-dev.sh ## admin frontend


## LOGS ##
docker compose logs -f ## follow the logs 
# docker compose logs -f api, web, db-local ## follow specific logs 