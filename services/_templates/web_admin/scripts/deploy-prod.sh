#! /usr/bin/env sh

set -e

cd services/web_admin/app/

yarn ng build --configuration production --aot
firebase use firebase_project_id
firebase deploy
