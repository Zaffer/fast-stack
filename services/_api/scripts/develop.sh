#! /usr/bin/env sh
set -e

## START SCRIPT FOR DEVELOPMENT ##

export ENVIRONMENT=dev

services/_api/scripts/start.sh

# services/_api/scripts/db-up.sh