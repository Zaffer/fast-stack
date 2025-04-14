FROM node:22.9-alpine

WORKDIR /home/node/app

# Install Java (needed for firestore emulator)
RUN apk add --no-cache openjdk17

# Install Firebase CLI
RUN npm install -g firebase-tools

# Install Python for Firebase functions using python
RUN apk add --no-cache python3 py3-pip

# Setup Firebase emulators
# RUN firebase setup:emulators:ui
# RUN firebase setup:emulators:auth
# RUN firebase setup:emulators:functions
# RUN firebase setup:emulators:firestore
# RUN firebase setup:emulators:hosting
# RUN firebase setup:emulators:extensions

# # Copy the entire app directory
# COPY --chown=node ./app .
# # COPY ./app .

# # Switch to 'node' user
# USER node

# Copy the entrypoint script into the container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# # Set the entrypoint script as the container's entrypoint
ENTRYPOINT ["/entrypoint.sh"]
