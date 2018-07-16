FROM node:8

ENV IONIC_VERSION=3.19.1

# Install global dependencies
RUN echo "Installing npm modules..."
RUN npm i -g ionic@${IONIC_VERSION}

# Instlal local dependencies
COPY package.json .
COPY package-lock.json .
RUN npm i

WORKDIR  build
