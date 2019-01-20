FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm config set @plt:registry https://registry.plt.et.tu-dresden.de:4873 
RUN npm install
RUN npm run build



# Docker Parent Image with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
