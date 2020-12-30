FROM node:12-alpine

WORKDIR /src

COPY package.json yarn.lock /src/

RUN yarn install && yarn cache clean

COPY . /src

CMD ["yarn", "run", "build"]
