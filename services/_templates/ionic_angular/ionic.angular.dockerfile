FROM node:lts-alpine

ENV PNPM_HOME=/home/node/.pnpm-global
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

RUN pnpm add -g @ionic/cli
RUN pnpm add -g @angular/cli
RUN pnpm add -g firebase-tools

WORKDIR /home/node/app

COPY ./web .

RUN chown -R node:node /home/node/app

USER node

RUN pnpm install

CMD pnpm start --host 0.0.0.0