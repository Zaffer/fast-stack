#! /usr/bin/env sh

set -e

# ionic serve the web app


md_web --build

md_web yarn ng build --configuration production --aot

md_web firebase use smartviewportal

md_web firebase deploy
