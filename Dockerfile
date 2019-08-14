# build app
FROM node:lts as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# deploy app in simple nginx image
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
