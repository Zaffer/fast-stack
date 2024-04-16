#! /usr/bin/env sh

set -e

cd services/_templates/web_app/src/

ionic cap build --androidreleasetype APK android


cd services/_templates/web_app/src/

cd android

./gradlew assembleDebug
# ./gradlew assembleRelease