# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /home/node/app

# Install Java (needed for firestore emulator)
RUN apk add --no-cache openjdk11

# Install Firebase CLI
RUN npm install -g firebase-tools

# Setup Firebase emulators
RUN firebase setup:emulators:ui
RUN firebase setup:emulators:auth
RUN firebase setup:emulators:functions
RUN firebase setup:emulators:firestore
RUN firebase setup:emulators:hosting
RUN firebase setup:emulators:extensions

# # Copy the entrypoint script into the container
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# # Copy the entire app directory
# COPY --chown=node ./app .
# # COPY ./app .

# # Switch to 'node' user
# USER node

# # Set the entrypoint script as the container's entrypoint
# ENTRYPOINT ["/entrypoint.sh"]