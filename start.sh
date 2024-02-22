#! /usr/bin/env sh
set -e

## START SCRIPT COLLECTION ##
# comment out and uncomment each line as needed


## DEVELOPMENT TOOLS ##
# docker compose up db-local -d ## local database
# docker compose up pgadmin -d ## PGAdmin
# docker compose up cloudsql -d ## cloudsql proxy


## MAIN APPLICATIONS ##
# sh services/_api/scripts/start-dev.sh ## backend
# sh services/_web/scripts/start-dev.sh ## frontend
sh services/_templates/web_admin/scripts/start-dev.sh ## admin frontend


## LOGS ##
# docker compose logs -f ## follow the logs 
# docker compose logs -f api, web, db-local ## follow specific logs 