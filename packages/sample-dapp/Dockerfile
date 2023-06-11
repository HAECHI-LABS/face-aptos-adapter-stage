FROM node:18 AS builder

WORKDIR /app
COPY ./packages/sample-dapp/build ./build

FROM nginx:stable
COPY --from=builder /app/build /usr/share/nginx/html
