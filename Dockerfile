FROM node:8.9.0

WORKDIR /app

RUN npm i -g yarn
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

RUN yarn client:build

