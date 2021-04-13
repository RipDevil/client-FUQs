# REACT BUILDER
FROM node:15-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build --silent

# NGINX
FROM nginx:1.19.9-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf