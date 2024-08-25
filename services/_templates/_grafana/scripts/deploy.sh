#! /usr/bin/env sh

set -e

# # DEPLOY TO PRODUCTION # #

# # set Google Cloud project for hosting
gcloud config set project VAR_gcp_projec
gcloud config set run/region europe-west1

# # build the images
docker compose down
docker compose -f docker-compose.yml build grafana
# docker compose -f docker-compose.yml build grafana --no-cache

# # upload image to artifact registry
docker tag qr-space-grafana europe-west1-docker.pkg.dev/VAR_gcp_projec/grafana/grafana-oss:latest
docker push europe-west1-docker.pkg.dev/VAR_gcp_projec/grafana/grafana-oss:latest

# # deploy cloud run revision with latest image
gcloud run deploy grafana-oss --image europe-west1-docker.pkg.dev/VAR_gcp_projec/grafana/grafana-oss:latest

# # webhook alert
curl -X POST -H "Content-Type: application/json" -d '{"content": "'${USER}' deployed GRAFANA 📊"}'  https://discord.com/api/webhooks/

echo '📊'
