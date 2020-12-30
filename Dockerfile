# FROM node:12-alpine

# WORKDIR /src
# COPY package.json yarn.lock /src/
# RUN npm install --production

# COPY . /src

# EXPOSE 3000

# CMD ["yarn", "start"]
FROM node:9-alpine

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
