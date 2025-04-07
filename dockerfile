FROM node:20-alpine as builder
COPY . ./

RUN npm i
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["node", "./server/index.mjs"]
