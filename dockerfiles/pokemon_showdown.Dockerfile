FROM node:16-bullseye

WORKDIR /opt/app
COPY pokemon_showdown ./

RUN cp config/config-example.js config/config.js && \
    npm install --global typescript @swc/core-linux-arm64-gnu && \
    npm link typescript @swc/core-linux-arm64-gnu && \
    ./pokemon_showdown

expose 8000

