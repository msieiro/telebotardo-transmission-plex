FROM node:16-slim

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "main.js" ]
