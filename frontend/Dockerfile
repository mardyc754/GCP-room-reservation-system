FROM node:22-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

ENV VITE_BACKEND_BASE_URL='https://room-reservation-backend-321212193587.europe-west1.run.app'

EXPOSE 3000

RUN pnpm run build

CMD ["pnpm", "start"]