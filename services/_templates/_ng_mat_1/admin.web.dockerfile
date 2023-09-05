# specify the node base image with your desired version node:<version>
FROM node:lts-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node/app

COPY --chown=node ./app .

RUN yarn set version stable
RUN yarn install

USER node

CMD yarn start --host 0.0.0.0