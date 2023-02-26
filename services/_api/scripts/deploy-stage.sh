#! /usr/bin/env sh

set -e

# # DEPLOY TO STAGING # #

# # set the environment
export ENVIRONMENT=stage
export GOOGLE_CLOUD_PROJECT=your_gcp_project_stage
gcloud config set project your_gcp_project_stage

docker compose down

# # build the images
docker compose -f docker-compose.yml build api --no-cache

# # upload image to artifact registry
docker tag faap-stack-api europe-west1-docker.pkg.dev/your_gcp_project_stage/your-gcp-artifacts/api:latest
docker push europe-west1-docker.pkg.dev/your_gcp_project_stage/your-gcp-artifacts/api:latest

# # deploy cloud run revision with latest image
gcloud run deploy api --image europe-west1-docker.pkg.dev/your_gcp_project_stage/your-gcp-artifacts/api:latest

# # webhook alert
curl -X POST -H "Content-Type: application/json" -d '{"content": "'${USER}' deployed API to STAGE 🚂"}' https://discord.com/api/webhooks/

echo '🚂'
