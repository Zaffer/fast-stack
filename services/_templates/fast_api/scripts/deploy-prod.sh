#! /usr/bin/env sh

set -e

# # DEPLOY TO PRODUCTION # #

# # set the environment
export ENVIRONMENT=prod
export GOOGLE_CLOUD_PROJECT=your_gcp_project_prod
gcloud config set project your_gcp_project_prod

docker compose down

# # build the images
docker compose -f docker-compose.yml build api --no-cache

# # upload image to artifact registry
docker tag faap-stack-api europe-west1-docker.pkg.dev/your_gcp_project_prod/your-gcp-artifacts/api:latest
docker push europe-west1-docker.pkg.dev/your_gcp_project_prod/service_account-artifacts-prod/api:latest

# # deploy cloud run revision with latest image
gcloud run deploy api --image europe-west1-docker.pkg.dev/your_gcp_project_prod/your-gcp-artifacts/api:latest

# # webhook alert
curl -X POST -H "Content-Type: application/json" -d '{"content": "'${USER}' deployed API to PROD 🚢"}'  https://discord.com/api/webhooks/

echo '🚢'
