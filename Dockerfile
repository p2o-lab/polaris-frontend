# Docker Parent Image with nginx
FROM nginx:alpine

COPY dist /usr/share/nginx/html
