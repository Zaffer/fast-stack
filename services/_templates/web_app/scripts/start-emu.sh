#! /usr/bin/env sh
set -e

## START SCRIPT FOR RUNNING FIREBASE EMULATOR TOOL ##

export FASTSTACK_SERVICE=_templates/web_app
export GENERATIVE_AI_PROVIDER=openai
export OPENAI_API_KEY=$(gcloud secrets versions access latest --secret="OPENAI_API_KEY")
export OPENAI_ASSISTANT_ID=$(gcloud secrets versions access latest --secret="OPENAI_ASSISTANT_ID")
docker compose up firebase -d
