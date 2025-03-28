FROM --platform=linux/arm64 node:slim
COPY ./.output /
EXPOSE 3000
CMD ["node", "./server/index.mjs"]
