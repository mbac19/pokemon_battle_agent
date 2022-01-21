FROM node:gallium-alpine

WORKDIR /opt/app
RUN chown -R node:node /opt/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node battle_simulator/ ./battle_simulator/

RUN apk update && \
    apk upgrade && \
    apk add --update python3 make g++ && \
    rm -rf /var/cache/apk/*

RUN npm install && npm install --workspaces && npm run build

USER node

# TODO: Need to figure out how to specify exposed ports without hard-coding them
# in the dockerfile. Maybe include them in the build CLI command.
expose 8001

ENTRYPOINT [ "npm", "--prefix", "battle_simulator", "start" ]
