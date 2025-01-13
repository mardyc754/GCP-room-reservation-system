FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

ENV NODE_ENV production

RUN pnpm run build

EXPOSE 3000


CMD ["pnpm", "start"]