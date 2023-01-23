FROM node:18.13.0-alpine

WORKDIR /usr/src/app/server

COPY package*.json ./

EXPOSE 5000

ENV NODE_ENV=production

RUN npm ci

COPY . .

CMD ["npm", "start"]