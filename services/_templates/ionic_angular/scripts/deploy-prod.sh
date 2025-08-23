#! /usr/bin/env sh

set -e

cd services/_templates/ionic_angular/src/

gcloud config set project ionic_angular_project_firebase
pnpm ng build --configuration production --aot
firebase use ionic_angular_project_firebase
firebase deploy
# firebase deploy --only functions
