FROM node:21-alpine3.18

COPY config /app/config
COPY src /app/src
COPY package.json /app/
COPY index.js /app/
COPY app.js /app/
COPY .env /app/

WORKDIR /app

RUN npm install

CMD ["npm", "start"]