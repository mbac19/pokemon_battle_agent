FROM node:16-bullseye

WORKDIR /opt/app
COPY pokemon_showdown ./

RUN cp config/config-example.js config/config.js && \
    touch config/usergroups.csv && \
    echo "admin,&" >> config/usergroups.csv && \
    npm install && \
    npm install --global typescript @swc/core-linux-arm64-gnu && \
    npm link @swc/core-linux-arm64-gnu

expose 8000

ENTRYPOINT ["./pokemon-showdown"]

