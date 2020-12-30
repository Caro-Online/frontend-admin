FROM node:14-alpine

WORKDIR /src
COPY package.json yarn.lock /src/
RUN npm install --production

COPY . /src

EXPOSE 3000

CMD ["yarn", "start"]
