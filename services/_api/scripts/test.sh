#! /usr/bin/env sh

set -e

# Run the test on the built container

docker compose down
docker volume prune -f

export ENVIRONMENT=dev
scripts/qrs/set-secrets.sh

# docker compose up -d --build
docker compose up -d

scripts/qrs/db-upgrade.sh

docker exec web python -m pytest --show-capture=no -p no:cacheprovider
# docker exec api python -m pytest --show-capture=no -p no:cacheprovider /app/app/tests/
