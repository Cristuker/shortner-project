FROM node:20-alpine

WORKDIR /apps

COPY package*.json ./
COPY tsconfig.json ./

COPY apps/shortner-api ./apps/shortner-api
COPY libs ./libs

RUN npm install

EXPOSE 3000
RUN ls
CMD ["nest start shortner-api"]