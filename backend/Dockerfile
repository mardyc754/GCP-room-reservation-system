FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

ARG FRONTEND_BASE_URL
ARG DATABASE_URL
ENV FRONTEND_BASE_URL=$FRONTEND_BASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN pnpm run build

EXPOSE 8080

RUN pnpm run migrate

CMD ["pnpm", "start"]