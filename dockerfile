FROM --platform=linux/arm64 node:22-alpine as builder
COPY . ./
RUN npm i
RUN npx prisma generate
RUN npm run build

FROM --platform=linux/arm64 node:22-alpine as deployment

COPY --from=builder /.output /

EXPOSE 3000
CMD ["node", "./server/index.mjs"]
