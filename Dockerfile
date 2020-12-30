# FROM node:12-alpine

# WORKDIR /src

# COPY package.json yarn.lock /src/

# RUN yarn install && yarn cache clean

# COPY . /src

# CMD ["yarn", "run", "build"]
FROM node:12-alpine

# this makes the build fail in travis ! see https://github.com/nodejs/docker-node/issues/661
# RUN npm install --global yarn

COPY package.json .
COPY yarn.lock .

RUN yarn install; \
  yarn global add serve

COPY . .
RUN yarn build

ENV NODE_ENV=production

EXPOSE 3000
CMD serve -p $PORT -s build
# FROM node:12-alpine
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# RUN yarn build
