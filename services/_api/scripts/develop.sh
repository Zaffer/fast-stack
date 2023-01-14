#! /usr/bin/env sh
set -e

## START SCRIPT FOR DEVELOPMENT ##
# always start the development environment with this script

export ENVIRONMENT=dev

services/_api/scripts/start.sh
