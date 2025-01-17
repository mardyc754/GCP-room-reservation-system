FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

RUN pnpm run build

EXPOSE 8080

ENV DB_HOST='34.22.233.151'
ENV DB_PORT=5432
ENV DB_USER='db_user'
ENV DB_PASS='db_password'
ENV DB_NAME='room-reservation-db'
ENV JWT_SECRET someverylongsecretkeythatshouldnotbeinproduction
ENV FRONTEND_BASE_URL='https://room-reservation-frontend-321212193587.europe-west1.run.app'
ENV PROJECT_ID='gcp-room-reservation-system'

CMD ["pnpm", "start"]