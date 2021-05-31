# REACT AND STORYBOOK BUILDER
FROM node:15-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build --silent
RUN npm run build-storybook -- -o ./storybook-build

# NGINX
FROM nginx:1.19.9-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/storybook-build /usr/share/nginx/storybook

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf