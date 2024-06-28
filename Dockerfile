FROM node:latest AS build-stage
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build-only

FROM node:latest AS production-stage
WORKDIR /app
COPY backend/ .
COPY --from=build-stage /app/dist /app/public/dist
RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]