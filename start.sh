#! /usr/bin/env sh
set -e

## START SCRIPT COLLECTION ##
# comment out and uncomment each line as needed ##

## MAIN APPLICATIONS ##

## backend
sh services/_api/scripts/start-dev.sh

## frontend
# sh services/_web/scripts/start-dev.sh


## DEVELOPMENT TOOLS ##

## pgadmin
# docker compose up pgadmin -d

## cloudsql proxy
# docker compose up cloudsql -d


## LOGS ##

## follow the logs 
# docker compose logs -f
# docker compose logs -f api, web, db-local