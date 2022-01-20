FROM node:latest as node
WORKDIR /app
COPY . /app
RUN npm install
ARG configuration=production
RUN npm run build -- --prod --configuration=$configuration

FROM nginx:alpine
COPY --from=node /app/dist/sistema-casa-web /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf