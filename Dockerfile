FROM node:alpine AS builder
LABEL authors="liun"

WORKDIR /usr/src/webuntu
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/webuntu/dist/ /usr/share/nginx/html
EXPOSE 80