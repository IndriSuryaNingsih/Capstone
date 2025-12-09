FROM node:20-alpine

WORKDIR /app

# Baris 4: Tambahkan ARG untuk memaksa build ulang (Cache Busting)
ARG BUILD_DATE=unknown

RUN rm -rf node_modules

# Baris 7: Pindahkan COPY package*.json ke atas
COPY package*.json ./

# Baris 9: JALANKAN INSTALASI
RUN npm install 

# Baris 11: Pindahkan COPY . . ke bawah setelah instalasi!
# Ini memastikan node_modules tidak ditimpa oleh file lokal dari Windows
COPY . .

ENV PORT 5000
EXPOSE 5000

CMD [ "node", "server.js" ]
