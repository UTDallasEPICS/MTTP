FROM --platform=linux/arm64 node:22-alpine as builder
RUN apt-get update -y && apt-get install -y openssl
COPY . ./
RUN npm i
RUN npx prisma generate
RUN npm run build

FROM --platform=linux/arm64 node:22-alpine as deployment
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /.output /
COPY --from=builder /prisma/client /prisma/client
EXPOSE 3000
CMD ["node", "./server/index.mjs"]