# 開発用 Dockerfile (Next.js 15 + Node 20)
FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["npm", "run", "dev"]
