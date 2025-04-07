FROM --platform=linux/arm64 node:alpine
COPY ./.output /
RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3
EXPOSE 3000
CMD ["node", "./server/index.mjs"]
