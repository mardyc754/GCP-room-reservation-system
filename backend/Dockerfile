FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

COPY .env .env

RUN pnpm run build

EXPOSE 8080

RUN pnpm run migrate

CMD ["pnpm", "start"]