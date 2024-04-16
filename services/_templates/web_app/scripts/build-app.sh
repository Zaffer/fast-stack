#! /usr/bin/env sh

set -e

# you need to run this script if you have added new service worker etc.

cd services/_templates/web_app/src/

yarn ng build
