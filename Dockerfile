FROM node:20-alpine AS build
WORKDIR /frontend
RUN npm install -g @angular/cli
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /frontend/dist/valantis-jewelry-store /usr/share/nginx/html
EXPOSE 80
