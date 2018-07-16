FROM node:8

WORKDIR /build

# Copy required assets
COPY package.json .
COPY package-lock.json .
COPY prepare.js .
COPY resources .
COPY www .

# Install dependencies
RUN npm i

# Prepare and build cordova app
RUN node prepare.js
