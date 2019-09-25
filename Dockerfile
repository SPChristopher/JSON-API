FROM node:10-alpine

RUN mkdir -p /home/spcristofer/Escritorio/jsonserver/node_modules && chown -R node:node /home/spcristofer/Escritorio/jsonserver

WORKDIR /home/spcristofer/Escritorio/jsonserver

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]