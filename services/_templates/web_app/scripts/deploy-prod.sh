#! /usr/bin/env sh

set -e

cd services/_templates/web_app/src/

gcloud config set project web_app_project_firebase
pnpm ng build --configuration production --aot
firebase use web_app_project_firebase
firebase deploy
# firebase deploy --only functions
