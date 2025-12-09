FROM node:20-alpine

WORKDIR /app
RUN rm -rf node_modules

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
