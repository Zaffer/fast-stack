#! /usr/bin/env sh

set -e

cd services/_templates/_ng_ion/app/

yarn ng build --configuration production --aot
firebase use your-firbease-project
firebase deploy
