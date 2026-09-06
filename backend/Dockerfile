FROM node:20-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache curl

HEALTHCHECK --interval=90s --timeout=20s --retries=3 \
CMD curl -f http://localhost:2000/docker || exit 1

COPY --from=builder /build ./

EXPOSE 2000

CMD ["node", "app.js"]

