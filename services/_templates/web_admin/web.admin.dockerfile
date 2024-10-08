FROM node:lts-alpine as base

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

# RUN npm install -g @ionic/cli
RUN npm install -g @angular/cli
RUN npm install -g firebase-tools

WORKDIR /home/node/app

COPY --chown=node ./frontend .

RUN corepack enable
RUN corepack prepare yarn@stable --activate
RUN yarn set version stable
RUN yarn install

USER node

CMD yarn start --host 0.0.0.0
