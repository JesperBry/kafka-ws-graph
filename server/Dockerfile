FROM node:18.13.0-alpine

RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      python3

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

WORKDIR /usr/src/app/server

COPY package*.json ./

EXPOSE 5000

ENV NODE_ENV=production

RUN npm ci

COPY . .

CMD ["npm", "start"]