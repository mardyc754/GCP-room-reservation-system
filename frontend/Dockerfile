FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

ENV NODE_ENV production

EXPOSE 3000

RUN pnpm run build

CMD ["pnpm", "start"]