#!/bin/sh
set -e

# Navigate to functions_python directory
cd /home/node/app/functions_python

# Install the required packages
python3 -m venv venv
. ./venv/bin/activate
pip install -r requirements.txt

# Navigate back to app directory
cd ..

# Execute the Firebase command
exec "$@"

# # NOTE: to delete the venv, run:
# # sudo chown -R $(whoami) ./venv && rm -rf ./venv
# # sudo chown -R $(whoami) ./__pycache__/ && rm -rf ./__pycache__/
