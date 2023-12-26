FROM node:18-buster AS setup
WORKDIR app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

FROM setup as test
RUN npm run test:ci

FROM setup as builder
WORKDIR app
RUN npm run build:ci

FROM nginx:stable-alpine as final
COPY --from=builder app/build/**/* /usr/share/nginx/html
COPY --from=builder app/build/index.html /usr/share/nginx/html/index.html
COPY --from=builder app/build/index.html /usr/share/nginx/html/404.html
COPY --from=builder app/build/_app /usr/share/nginx/html/_app
EXPOSE 80
