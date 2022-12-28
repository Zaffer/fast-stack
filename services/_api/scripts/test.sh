#! /usr/bin/env sh
set -e

## START SCRIPT FOR TESTING ##

export ENVIRONMENT=test

services/_api/scripts/start.sh

echo "TESTING SCRIPT HAS BEEN RUN"

# docker exec api python -m pytest --show-capture=no -p no:cacheprovider
# docker exec api python -m pytest --show-capture=no -p no:cacheprovider /app/app/tests/ # run specific tests

# # - name: Flake8
# run: docker exec fastapi-tdd python -m flake8 .
# # - name: Black
# run: docker exec fastapi-tdd python -m black . --check
# # - name: isort
# run: docker exec fastapi-tdd python -m isort . --check-only
