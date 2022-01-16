FROM node:gallium-alpine

# Setup the Lerna Environment
WORKDIR /opt/app
RUN chown -R node:node /opt/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node projects/battle_simulator/ ./projects/battle_simulator/

# Need these build tools to properly build bcrypt dependency.
RUN apk update && \
    apk upgrade && \
    apk add --update python3 make g++ && \
    rm -rf /var/cache/apk/*

RUN npm install && \
    npm run build

USER node

# TODO: Need to figure out how to specify exposed ports without hard-coding them
# in the dockerfile. Maybe include them in the build CLI command.
expose 8000

ENTRYPOINT [ "npm", "--prefix", "projects/battle_simulator", "start" ]
