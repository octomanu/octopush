FROM node:alpine as builder

RUN npm i -g @nestjs/cli

COPY . /home/node

WORKDIR /home/node

RUN npm install

RUN npm run build

FROM node:alpine AS prod

COPY --from=builder /home/node/dist /home/node/dist

CMD ["node", "dist/main"]