FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "start:prod"]