#! /usr/bin/env sh

set -e

cd services/_ng_mat_2/app/

yarn ng build --configuration production --aot
firebase use my-firebase-project-staging
firebase deploy
