FROM node:14-alpine as base

WORKDIR /src
COPY package.json yarn.lock /src/
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN yarn ci
COPY . /src
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . /src
CMD ["yarn", "start"]
