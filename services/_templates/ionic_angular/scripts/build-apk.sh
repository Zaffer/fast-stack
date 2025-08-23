#! /usr/bin/env sh

set -e

## this script is for building the APK for the Android app ##

cd services/_templates/ionic_angular/src/

ionic cap build --androidreleasetype APK android


cd services/_templates/ionic_angular/src/

cd android

./gradlew assembleDebug
# ./gradlew assembleRelease