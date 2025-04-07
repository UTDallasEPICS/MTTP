FROM --platform=linux/arm64 node:alpine
COPY ./.output /
RUN apk update && apk upgrade
RUN apk add --no-cache openssl
EXPOSE 3000
CMD ["node", "./server/index.mjs"]
