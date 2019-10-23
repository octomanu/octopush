FROM node:10.16-alpine

RUN npm i -g @nestjs/cli

COPY . /home/node

WORKDIR /home/node

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]