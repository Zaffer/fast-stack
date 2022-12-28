#! /usr/bin/env sh
set -e

# # DEPLOY TO PRODUCTION # #

# # set the environment
export ENVIRONMENT=prod

docker compose down

# # build the images
docker compose -f docker-compose.yml build api --no-cache

# # upload image to artifact registry
docker tag _api-service europe-west1-docker.pkg.dev/gcp-project/artifact-name/arti-folder:latest
docker push europe-west1-docker.pkg.dev/gcp-project/artifact-name/arti-folder:latest

# # change to production project
gcloud config set project gcp-project

# # deploy cloud run revision with latest image
gcloud run deploy _api-productin_cloud_run --image europe-west1-docker.pkg.dev/gcp-project/artifact-name/arti-folder:latest

# # webhook alert
curl -X POST -H "Content-Type: application/json" -d '{"content": "'${USER}' deployed API to PRODUCTION 🚢"}' https://discord.com/api/webhooks/

echo '🚢'
